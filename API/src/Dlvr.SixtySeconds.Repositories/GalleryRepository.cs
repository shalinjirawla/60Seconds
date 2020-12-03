using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class GalleryRepository : Repository<TaskAssignment, PaggerRequestDTO, GalleryPitchDTO>, IGalleryRepository
    {
        IConfiguration _configuration;
        #region "Init constructor with DbContext"
        public GalleryRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper, IConfiguration configuration) : base(context, token, mapper)
        {
            _configuration = configuration;
        }
        #endregion

        #region "Main methods"

        #region Get Gallery Pitch
        public override async Task<PaggerResponseDTO<GalleryPitchDTO>> GetAll(PaggerRequestDTO dto)
        {
            try
            {
                Expression<Func<GalleryPitchDTO, object>> sortExpression;
                switch (dto.SortBy?.ToLower())
                {
                    default:
                        sortExpression = (x => x.FeaturedOn);
                        break;
                }
                var lst = GetGalleryPitchList();
                var result = await GetPaggerResponseDTO(lst, dto, sortExpression);

                foreach (var videoRehearsal in result.Records)
                {
                    videoRehearsal.ScriptContents = await GetTaskScriptContents(videoRehearsal.TaskAssignmentId);
                }
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<GalleryPitchDTO> GalleryPitch(long assignmentId)
        {
            var lst = GetGalleryPitchList();
            var result = await lst.FirstOrDefaultAsync(x => x.TaskAssignmentId == assignmentId);
            if (result != null)
            {
                result.ScriptContents = await GetTaskScriptContents(assignmentId);
            }
            return result;
        }
        private async Task<IEnumerable<TaskScriptContentDTO>> GetTaskScriptContents(long assignmentId)
        {
            var taskAssignments = Context.TaskAssignments.Include(x => x.Task).ThenInclude(x => x.BusinessUnit).Include(x => x.Script)
                        .ThenInclude(x => x.ScriptContents).AsQueryable();
            var taskAssignment = await taskAssignments.FirstOrDefaultAsync(x => x.Id == assignmentId);
            if (taskAssignment != null)
            {
                var businessUnit = Mapper.Map<BusinessUnitDTO>(taskAssignment.Task.BusinessUnit);
                return (from sc in taskAssignment.Script.ScriptContents
                        join sf in businessUnit.ScriptFieldCollection on sc.ScriptFieldId equals sf.Id
                        select new TaskScriptContentDTO()
                        {
                            Id = sf.Id,
                            Index = sf.Index,
                            Title = sf.Title,
                            ScriptFieldvalue = sc.ScriptFieldvalue,
                        });
            }
            return null;
        }
        private IQueryable<GalleryPitchDTO> GetGalleryPitchList()
        {
            return Context.TaskAssignments.Include(x => x.User).ThenInclude(x => x.Roles)
                 .Include(x => x.Task).Include(x => x.TaskAssignmentComments).Include(x => x.TaskAssignmentLikes).Include(x => x.VideoRehearsals)
                 .Where(x => x.IsFeatured && x.DeletedOn == null && x.VideoRehearsals.Any(v => v.DeletedOn == null) && x.Task.BusinessUnitId == Token.BusinessUnitId)
                 .Select(x => new GalleryPitchDTO()
                 {
                     TaskAssignmentId = x.Id,
                     TaskId = x.TaskId,
                     TaskTitle = x.Task.Title,
                     AssigneeName = x.User.FirstName + " " + x.User.LastName,
                     AssigneePhoto = string.Empty,
                     AssigneeRole = x.User.Roles.FirstOrDefault().Role.Name,
                     FeaturedOn = x.FeaturedOn,
                     VideoRehearsalUrl = x.VideoRehearsals.OrderByDescending(x => x.CreatedOn).FirstOrDefault(v => v.DeletedOn == null) != null ?
                     x.VideoRehearsals.OrderByDescending(x => x.CreatedOn).FirstOrDefault(v => v.DeletedOn == null).VideoUrl : string.Empty,
                     CommentsCount = x.TaskAssignmentComments.Count(),
                     LikesCount = x.TaskAssignmentLikes.Count(tl => tl.IsLiked && tl.DeletedOn == null),
                     Share = 0,
                     ShareableUrl = $"{_configuration["AppSettings:WebAppUrl"]}/gallery/{x.Id}",
                     IsLiked = x.TaskAssignmentLikes.Any(l => l.CreatedBy == Token.Id && l.IsLiked && l.DeletedOn == null)
                 });
        }
        #endregion

        #region Add or Update Task Assignment Like/Unlike
        public async Task<int> LikeUnlikeTaskAssignment(long taskAssignmentId, bool isLiked)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var taskAssignment = await Context.TaskAssignments.FindAsync(taskAssignmentId);
                    if (taskAssignment.AssignedTo != Token.Id)
                    {
                        var taskAssignmentLike = await Context.TaskAssignmentLikes.FirstOrDefaultAsync(x =>
                    x.TaskAssignmentId == taskAssignmentId && x.CreatedBy == Token.Id && x.DeletedOn == null);
                        if (taskAssignmentLike != null)
                        {
                            taskAssignmentLike.IsLiked = isLiked;
                            taskAssignmentLike.UpdatedBy = Token.Id;
                            taskAssignmentLike.UpdatedOn = DateTime.UtcNow;
                        }
                        else
                        {
                            await Context.TaskAssignmentLikes.AddAsync(new TaskAssignmentLike()
                            {
                                TaskAssignmentId = taskAssignmentId,
                                IsLiked = true,
                                CreatedBy = Token.Id,
                                CreatedOn = DateTime.UtcNow
                            });
                        }
                        await Context.SaveChangesAsync();
                        transaction.Commit();
                        return await System.Threading.Tasks.Task.FromResult(1);
                    }
                    return await System.Threading.Tasks.Task.FromResult(2);
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return await System.Threading.Tasks.Task.FromResult(0);
                }
            }
        }
        #endregion

        #region Share Task Assignment
        public async Task<bool> ShareTaskAssignment(long taskAssignmentId, List<long> userList)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    foreach (var userId in userList)
                    {
                        var taskAssignmentShare = new TaskAssignmentShare()
                        {
                            CreatedBy = Token.Id,
                            CreatedOn = DateTime.UtcNow,
                            TaskAssignmentId = taskAssignmentId,
                            ToUser = userId
                        };
                        await Context.TaskAssignmentShares.AddAsync(taskAssignmentShare);
                    }
                    await Context.SaveChangesAsync();
                    transaction.Commit();
                    return await System.Threading.Tasks.Task.FromResult(true);
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return await System.Threading.Tasks.Task.FromResult(false);
                }
            }
        }
        #endregion
        #endregion
    }
}
