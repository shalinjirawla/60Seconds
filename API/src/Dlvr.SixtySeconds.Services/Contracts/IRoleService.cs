using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface IRoleService : IService<PaggerRequestDTO, RoleDTO>
    {
    }
}
