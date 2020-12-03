using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface ILoginService : IService
    {
        Task<ResponseDTO<AuthenticateResponseDTO>> Authenticate(AuthenticateDTO dto, DeviceDetailDTO deviceDetail);
        Task<ResponseDTO<bool>> Logout();
    }
}
