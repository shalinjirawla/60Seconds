using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface IUserRepository : ICreateUpdateDeleteRepository<PaggerRequestDTO, UserDTO, UserResponseDTO>
    {
        Task<List<UserResponseDTO>> GetRecipientsList();
        Task<List<UserResponseDTO>> GetReportToUsers();
        Task<bool> ValidateEmailExists(long id, UserDTO dto);

        Task<UserResponseDTO> GetUserByAuth0Id(string auth0Id);
        Task<PaggerResponseDTO<TeamMemberDTO>> GetTeamMembers(PaggerRequestDTO dto);
    }
}
