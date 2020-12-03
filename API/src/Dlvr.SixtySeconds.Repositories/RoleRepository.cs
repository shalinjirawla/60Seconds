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
using tpl = System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class RoleRepository : Repository<Role, PaggerRequestDTO, RoleDTO>, IRoleRepository
    {
        public RoleRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {
        }

        public override async Task<PaggerResponseDTO<RoleDTO>> GetAll(PaggerRequestDTO dto)
        {
            Expression<Func<Role, object>> sortExpression;
            switch (dto.SortBy?.ToLower())
            {
                case "firstname":
                    sortExpression = (x => x.Name);
                    break;
                default:
                    sortExpression = (x => x.CreatedOn);
                    break;
            }

            //TODO: we will not add Admin Role, for Temporary Using Id = 1 need to remove static Id = 1 add some proper logic
            var lst = Context.Roles.Where(t => t.Id > 1 && t.DeletedOn == null && (string.IsNullOrEmpty(dto.SearchKeyword))).Include(t => t.CreatedByUser).Include(t => t.UpdatedByUser);
            return await GetPaggerResponseDTO(lst, dto, sortExpression);
        }
    }
}
