using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface ILoginRepository : IRepository
    {
        System.Threading.Tasks.Task SaveUserSession(UserSession userSession);
        System.Threading.Tasks.Task SaveUserDeviceToken(UserTokenDetail userDeviceTokenDetails);
        Task<bool> ValidateRefreshToken(Guid refreshToken, Guid sessionId, Guid tokenId);
        Task<bool> Logout(Guid sessionId);
    }
}
