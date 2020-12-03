using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class LoginRepository : Repository, ILoginRepository
    {
        public LoginRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {

        }
        #region Main Methods
        public async System.Threading.Tasks.Task SaveUserSession(UserSession userSession)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    await Context.UserSessions.AddAsync(userSession);
                    await Context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
            }
        }

        public async System.Threading.Tasks.Task SaveUserDeviceToken(UserTokenDetail userTokenDetail)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    await Context.UserTokenDetails.AddAsync(userTokenDetail);
                    await Context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
            }
        }

        public async Task<bool> ValidateRefreshToken(Guid refreshToken, Guid sessionId, Guid tokenId)
        {
            try
            {
                var userTokenDetail = await Context.UserTokenDetails.FirstOrDefaultAsync(x => x.TokenId == tokenId && x.SessionId == sessionId);
                if (userTokenDetail != null)
                {
                    return userTokenDetail.RefreshToken == refreshToken;
                }
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Logout(Guid sessionId)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var userSession = await Context.UserSessions.FindAsync(sessionId);
                    if (userSession != null)
                    {
                        userSession.LogOffDate = DateTime.UtcNow;
                        await Context.SaveChangesAsync();
                        transaction.Commit();
                        return await System.Threading.Tasks.Task.FromResult(true);
                    }
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return await System.Threading.Tasks.Task.FromResult(false);
                }
            }
            return await System.Threading.Tasks.Task.FromResult(false);
        }
        #endregion

    }
}
