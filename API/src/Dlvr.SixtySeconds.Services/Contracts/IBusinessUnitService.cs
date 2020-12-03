using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface IBusinessUnitService : ICreateUpdateDeleteService<PaggerRequestDTO, BusinessUnitDTO, BusinessUnitDTO>
    {
        Task<ResponseDTO<PaggerResponseDTO<BusinessUnitKeywordDTO>>> GetKeywords(PaggerRequestDTO dto);
    }
}
