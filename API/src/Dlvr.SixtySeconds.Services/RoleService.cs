using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Dlvr.SixtySeconds.Resources.Localize;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using Dlvr.SixtySeconds.Shared.Constants;

namespace Dlvr.SixtySeconds.Services
{
    public class RoleService : Service<IRoleRepository, PaggerRequestDTO, RoleDTO>, IRoleService
    {
        public RoleService(IRoleRepository repository, ITokenDTO token, IMapper mapper, ILogger<RoleService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {

        }
    }
}
