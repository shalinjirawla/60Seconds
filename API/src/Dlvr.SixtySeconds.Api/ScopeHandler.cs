using Dlvr.SixtySeconds.Shared.Constants;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Api
{
    public class ScopeHandler : AuthorizationHandler<ScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement)
        {
            var userPermissions = context.User.Claims.FirstOrDefault(x => x.Type == "Permissions");
            if (userPermissions != null) 
            {
                var permissions = userPermissions.Value.Split("|");
                
                if (permissions.Contains(requirement.Scope))
                {
                    context.Succeed(requirement);
                }
            }
            return Task.CompletedTask;
        }
    }
}
