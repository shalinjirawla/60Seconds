using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Shared.Constants;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Localization;
using Dlvr.SixtySeconds.DomainObjects.Localization;
using Microsoft.AspNetCore.Authorization;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class RoleController : BaseController<IRoleService, PaggerRequestDTO, RoleDTO>
    {
        public RoleController(IRoleService service, ILogger<RoleController> logger) : base(service, logger)
        {
            
        }

        [Authorize(Scope.Role.AllRead)]
        public override Task<IActionResult> Get([FromQuery] PaggerRequestDTO request)
        {
            return base.Get(request);
        }
    }
}
