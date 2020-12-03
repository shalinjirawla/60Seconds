using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services
{
    public class BusinessUnitService : CreateUpdateDeleteService<IBusinessUnitRepository, PaggerRequestDTO, BusinessUnitDTO, BusinessUnitDTO>, IBusinessUnitService
    {      
        public BusinessUnitService(IBusinessUnitRepository repository, ITokenDTO token, IMapper mapper, ILogger<BusinessUnitService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {
           
        }

        public async Task<ResponseDTO<PaggerResponseDTO<BusinessUnitKeywordDTO>>> GetKeywords(PaggerRequestDTO dto)
        {
            var lst = await Repository.GetKeywords(dto);

            return new ResponseDTO<PaggerResponseDTO<BusinessUnitKeywordDTO>>()
            {
                Data = lst,
                ResponseType = ResponseType.SUCCESS
            };
        }
    }
}
