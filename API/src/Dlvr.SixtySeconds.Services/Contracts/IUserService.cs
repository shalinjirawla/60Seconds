using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface IUserService : ICreateUpdateDeleteService<PaggerRequestDTO, UserDTO, UserResponseDTO>
    {
        Task<ResponseDTO<List<UserResponseDTO>>> GetRecipientsList();
        Task<ResponseDTO<List<UserResponseDTO>>> GetReportToUsers();
        Task<PaggerResponseDTO<TeamMemberDTO>> GetTeamMembers(PaggerRequestDTO dto);
    }
}
