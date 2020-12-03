using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Dlvr.SixtySeconds.Models.BusinessUnit;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface IBusinessUnitRepository : ICreateUpdateDeleteRepository<PaggerRequestDTO, BusinessUnitDTO, BusinessUnitDTO>
    {
        Task<PaggerResponseDTO<BusinessUnitKeywordDTO>> GetKeywords(PaggerRequestDTO dto);
    }
}
