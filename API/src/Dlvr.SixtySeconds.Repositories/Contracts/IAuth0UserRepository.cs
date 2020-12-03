using Dlvr.SixtySeconds.DomainObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface IAuth0UserRepository : IDisposable
    {
        Task<string> Create(UserDTO dto);

        Task<bool> Update(long id, UserDTO dto);

        Task<bool> Delete(long id);

        Task<List<Auth0Permission>> GetAuth0Permissions(int roleId);

        Task<Auth0UserProfileResponse> GetAuth0UserProfile(string auth0Token);

        Task<Auth0UserResponse> GetAuth0UserByEmail(string email);
    }
}
