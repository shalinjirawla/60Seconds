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
using Newtonsoft.Json;
using AutoMapper;

namespace Dlvr.SixtySeconds.Repositories
{
    public class BusinessUnitRepository : CreateUpdateDeleteRepository<BusinessUnit, PaggerRequestDTO, BusinessUnitDTO, BusinessUnitDTO>, IBusinessUnitRepository
    {
        public BusinessUnitRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {
        }

        public override async Task<BusinessUnitDTO> Get(long id)
        {
            var businessUnit = await Context.BusinessUnits.FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);

            return Mapper.Map<BusinessUnitDTO>(businessUnit);
        }

        public override async Task<PaggerResponseDTO<BusinessUnitDTO>> GetAll(PaggerRequestDTO dto)
        {
            Expression<Func<BusinessUnit, object>> sortExpression;

            switch (dto.SortBy?.ToLower())
            {
                case "name":
                    sortExpression = (x => x.Name);
                    break;
                case "brandName":
                    sortExpression = (x => x.BrandName);
                    break;
                case "email":
                    sortExpression = (x => x.Email);
                    break;
                default:
                    sortExpression = (x => x.CreatedOn);
                    break;
            }

            var lst = Context.BusinessUnits.Where(t => t.DeletedOn == null && (string.IsNullOrEmpty(dto.SearchKeyword) || t.Name.Contains(dto.SearchKeyword) || t.BrandName.Contains(dto.SearchKeyword) || t.Email.Contains(dto.SearchKeyword)))
                        .Include(t => t.CreatedByUser).Include(t => t.UpdatedByUser);

            return await GetPaggerResponseDTO(lst, dto, sortExpression);
        }

        public async Task<PaggerResponseDTO<BusinessUnitKeywordDTO>> GetKeywords(PaggerRequestDTO dto)
        {
            Expression<Func<BusinessUnitKeyword, object>> sortExpression;

            switch (dto.SortBy?.ToLower())
            {
                default:
                    sortExpression = (x => x.Name);
                    break;
            }

            var lst = Context.BusinessUnitKeywords.Where(t => t.BusinessUnitId == Token.BusinessUnitId && (string.IsNullOrEmpty(dto.SearchKeyword) || t.Name.Contains(dto.SearchKeyword)));

            return await GetPaggerResponseDTO<BusinessUnitKeyword, BusinessUnitKeywordDTO>(lst, dto, sortExpression);
        }

        protected override long GetPrimaryKey(BusinessUnit model)
        {
            return model?.Id ?? 0;
        }

        protected override void UpdateProperties(BusinessUnit dest, BusinessUnit source, BusinessUnitDTO dto)
        {
            dest.BrandName = source.BrandName;
            dest.CountryId = source.CountryId;
            dest.Email = source.Email;
            dest.LogoUrl = source.LogoUrl;
            dest.Name = source.Name;
            dest.StateId = source.StateId;
            dest.Terms = source.Terms;
        }
    }
}
