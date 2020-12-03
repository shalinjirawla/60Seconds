using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class TaskAssignmentCommentRepository : CreateDeleteRepository<TaskAssignmentComment, TaskAssignmentCommentPaggerRequestDTO, TaskAssignmentCommentDTO, TaskAssignmentCommentResponseDTO>, ITaskAssignmentCommentRepository
    {
        public TaskAssignmentCommentRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {
        }

        public async override Task<TaskAssignmentCommentResponseDTO> Get(long id)
        {
            var comment = await Context.TaskAssignmentComments.Include(t => t.CreatedByUser).FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);

            return Mapper.Map<TaskAssignmentCommentResponseDTO>(comment);
        }

        public override async Task<PaggerResponseDTO<TaskAssignmentCommentResponseDTO>> GetAll(TaskAssignmentCommentPaggerRequestDTO dto)
        {
            var lst = Context.TaskAssignmentComments.Where(t => t.DeletedOn == null && t.TaskAssignmentId == dto.TaskAssignmentId && (string.IsNullOrEmpty(dto.SearchKeyword) || t.Description.Contains(dto.SearchKeyword))).Include(t => t.CreatedByUser);

            return await GetPaggerResponseDTO(lst, dto, x => x.CreatedOn);
        }

        protected override long GetPrimaryKey(TaskAssignmentComment model)
        {
            return model?.Id ?? 0;
        }

        public override async Task<long> Create(TaskAssignmentCommentDTO dto)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var commentId = await base.Create(dto);
                    foreach (var tag in dto.CommentTags)
                    {
                        await CreateCommentTag(tag, commentId);
                    }
                    await Context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return await System.Threading.Tasks.Task.FromResult(commentId);
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return await System.Threading.Tasks.Task.FromResult(0);
                }
            }
        }
        private async System.Threading.Tasks.Task CreateCommentTag(CommentTagsDTO tag, long commentId)
        {
            var buId = new long?();
            var userId = new long?();
            if (tag.Type == TeamType.B) { buId = tag.Id; }
            else { userId = tag.Id; }
            await Context.TaskAssignmentCommentTags.AddAsync(new TaskAssignmentCommentTags()
            {
                CommentId = commentId,
                Type = tag.Type,
                BusinessUnitId = buId,
                UserId = userId
            });
        }
    }
}
