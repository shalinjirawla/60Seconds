using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using tpl = System.Threading.Tasks;
using Dlvr.SixtySeconds.Shared.Enums;
using AutoMapper;
using System.Runtime.InteropServices.ComTypes;

namespace Dlvr.SixtySeconds.Repositories
{
    public class UserRepository : CreateUpdateDeleteRepository<User, PaggerRequestDTO, UserDTO, UserResponseDTO>, IUserRepository
    {
        public UserRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {

        }

        public override async Task<UserResponseDTO> Get(long id)
        {
            var user = await Context.Users.Include("Roles.Role").Include("Roles.BusinessUnit").Include(t => t.ReportToUser).FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);

            return Mapper.Map<UserResponseDTO>(user);
        }

        public async Task<UserResponseDTO> GetUserByAuth0Id(string auth0Id)
        {
            var user = await Context.Users.Include("Roles.Role").Include(t => t.ReportToUser).FirstOrDefaultAsync(t => t.Auth0Id.Equals(auth0Id) && t.DeletedOn == null);

            return Mapper.Map<UserResponseDTO>(user);
        }

        //getting get receipt list for create new task screen//
        public async Task<List<UserResponseDTO>> GetRecipientsList()
        {
            //getting currently logged in user's role detail//
            var resultRole = await Context.Roles.FirstOrDefaultAsync(t => t.Id.Equals(Token.RoleId) && t.DeletedOn == null);

            var query = (from u in Context.Users
                         join b in Context.BusinessUnitUsers on u.Id equals b.UserId
                         join r in Context.Roles on b.RoleId equals r.Id
                         where b.BusinessUnitId == Token.BusinessUnitId && u.DeletedOn == null && r.DeletedOn == null
                         select new UserResponseDTO
                         {
                             Id = u.Id,
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             Email = u.Email,
                             Phone = u.Phone,
                             ReportTo = u.ReportTo,
                             PictureUrl = u.PictureUrl,
                             BusinessUnitId = b.BusinessUnitId,
                             RoleId = r.Id,
                             RoleName = r.Name
                         }).AsQueryable();

            if (resultRole?.Name.ToLower() == RoleType.Coach.ToString().ToLower())
            {
                //if coach logged in wil get all sales person who are report to him//
                query = query.Where(x => x.ReportTo == Token.Id && x.ReportTo != null);
            }
            else
            {
                //if sales person logged in only one receipt which is he reports to//                
                query = query.Where(x => x.Id == Token.ReportTo);
            }
            return query.ToList();
        }

        //getting users ReportTo//
        public async Task<List<UserResponseDTO>> GetReportToUsers()
        {
            var role = await Context.Roles.FindAsync(Token.RoleId);
            bool isAdmin = role.Name.Equals(RoleType.Admin.ToString(), StringComparison.CurrentCultureIgnoreCase);

            return await (from u in Context.Users
                          join b in Context.BusinessUnitUsers on u.Id equals b.UserId
                          join r in Context.Roles on b.RoleId equals r.Id
                          where b.BusinessUnitId == Token.BusinessUnitId && u.DeletedOn == null && r.DeletedOn == null
                          && (r.Name == RoleType.Coach.ToString() || (isAdmin && r.Name == RoleType.Admin.ToString()))
                          select new UserResponseDTO
                          {
                              Id = u.Id,
                              FirstName = u.FirstName,
                              LastName = u.LastName,
                              Email = u.Email,
                              Phone = u.Phone,
                              ReportTo = u.ReportTo,
                              RoleId = r.Id,
                              RoleName = r.Name,
                              PictureUrl = u.PictureUrl,
                              BusinessUnitId = b.BusinessUnitId,
                              CreatedOn = u.CreatedOn
                          }).ToListAsync();
        }

        public override async Task<PaggerResponseDTO<UserResponseDTO>> GetAll(PaggerRequestDTO dto)
        {
            Expression<Func<User, object>> sortExpression;

            switch (dto.SortBy?.ToLower())
            {
                case "firstname":
                    sortExpression = (x => x.FirstName);
                    break;
                case "lastname":
                    sortExpression = (x => x.LastName);
                    break;
                case "email":
                    sortExpression = (x => x.Email);
                    break;
                case "reportingto":
                    sortExpression = (x => x.ReportToUser.FirstName);
                    break;

                default:
                    sortExpression = (x => x.CreatedOn);
                    break;
            }

            var lst = Context.Users.Include("Roles.Role").Include("Roles.BusinessUnit").Include(t => t.CreatedByUser).Include(t => t.UpdatedByUser).Include(t => t.ReportToUser)
                .Where(t => t.DeletedOn == null && t.Roles.Any(tt => tt.BusinessUnitId == Token.BusinessUnitId) && string.IsNullOrEmpty(dto.SearchKeyword) || t.FirstName.Contains(dto.SearchKeyword) || t.LastName.Contains(dto.SearchKeyword) || t.Email.Contains(dto.SearchKeyword));

            return await GetPaggerResponseDTO<User, UserResponseDTO>(lst, dto, sortExpression);
        }

        protected override void UpdateProperties(User dest, User source, UserDTO dto)
        {
            dest.FirstName = source.FirstName;
            dest.LastName = source.LastName;
            //dest.Email = source.Email;
            dest.Phone = source.Phone;
            dest.PictureUrl = source.PictureUrl;
            dest.ReportTo = source.ReportTo;
            source.Roles = GetRoles(dto, dest);

            //TODO: Keep Other Company Roles
            //dest.Roles.RemoveAll(t => !source.Roles.Any(b => b.BusinessUnitId == t.BusinessUnitId));

            foreach (var r in source.Roles)
            {
                //TODO: Here Need to update BuId with logged in User's BUID
                var role = dest.Roles.FirstOrDefault(t => t.BusinessUnitId == r.BusinessUnitId);

                if (role != null)
                {
                    role.RoleId = r.RoleId;
                }
                else
                {
                    dest.Roles.Add(r);
                }
            }
        }

        protected async override Task<bool> BeforeCreate(UserDTO dto, User model)
        {
            model.Roles = GetRoles(dto, model);
            return await base.BeforeCreate(dto, model);
        }

        public async Task<bool> ValidateEmailExists(long id, UserDTO dto)
        {
            var user = await Context.Users.FirstOrDefaultAsync(t => t.DeletedOn == null && t.Email.ToLower() == dto.Email.ToLower());

            return user != null && user.Id != id;
        }

        protected override async Task<User> FindAsync(long id, UserDTO dto)
        {
            return await Context.Users.Include(t => t.Roles).FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);
        }

        protected async override Task<bool> BeforeUpdate(long id, UserDTO dto, User model)
        {
            model.Roles = GetRoles(dto, model);
            return await base.BeforeUpdate(id, dto, model);
        }

        private List<BusinessUnitUser> GetRoles(UserDTO dto, User model)
        {
            var roles = new List<BusinessUnitUser>();

            //TODO : Need to Update Business Unit from Logged In User's BU ID
            roles.Add(new BusinessUnitUser() { RoleId = dto.RoleId, BusinessUnitId = Token.BusinessUnitId, User = model });

            return roles;
        }

        protected override long GetPrimaryKey(User model)
        {
            return model?.Id ?? 0;
        }

        #region Get team members
        public async Task<PaggerResponseDTO<TeamMemberDTO>> GetTeamMembers(PaggerRequestDTO dto)
        {
            try
            {
                var teamMembers = await Context.Users.Where(x => x.Id != Token.Id &&
                (x.ReportTo == Token.ReportTo || x.Id == Token.ReportTo)).Select(x => new TeamMemberDTO()
                {
                    Id = x.Id,
                    Name = x.FirstName + " " + x.LastName,
                    Type = TeamType.M
                }).ToListAsync();

                var bu = await Context.BusinessUnits.FindAsync(Token.BusinessUnitId);
                var manager = await Context.Users.FindAsync(Token.ReportTo);
                if (manager != null)
                { 
                    teamMembers.Add(new TeamMemberDTO()
                    {
                        Id = manager.Id,
                        Name = manager.FirstName + " " + manager.LastName + "'s Team",
                        Type = TeamType.T
                    });
                }
                if (bu != null)
                {
                    teamMembers.Add(new TeamMemberDTO()
                    {
                        Id = bu.Id,
                        Name = bu.Name + "'s Team",
                        Type = TeamType.B
                    });
                }
                if (!string.IsNullOrEmpty(dto.SearchKeyword))
                {
                    teamMembers = teamMembers.Where(x => x.Name.ToLower().Contains(dto.SearchKeyword.ToLower())).ToList();
                }
                return new PaggerResponseDTO<TeamMemberDTO>()
                {
                    TotalRecords = teamMembers.Count(),
                    PageIndex = dto.PageIndex,
                    Records = teamMembers.OrderBy(x=>x.Name).Skip((dto.PageIndex - 1) * dto.PageSize).Take(dto.PageSize).ToList()
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
    }
}
