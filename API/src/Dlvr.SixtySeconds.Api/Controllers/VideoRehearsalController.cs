using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Dlvr.SixtySeconds.Shared.Constants.Scope;
using Microsoft.AspNetCore.Authorization;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VideoRehearsalController : CreateDeleteController<IVideoRehearsalService, PaggerRequestDTO, VideoRehearsalDTO, VideoRehearsalDTO>
    {
        public VideoRehearsalController(IVideoRehearsalService service, ILogger<VideoRehearsalController> logger) : base(service, logger)
        {
        }

        [Authorize(Deliver.Read)]
        public override Task<IActionResult> Get([FromQuery] PaggerRequestDTO request)
        {
            return base.Get(request);
        }

        [Authorize(Deliver.Read)]
        public override async Task<IActionResult> Get(int id)
        {
            return await base.Get(id);
        }

        [Authorize(Deliver.Create)]
        public override async Task<IActionResult> Post([FromBody] VideoRehearsalDTO request)
        {
            return await base.Post(request);
        }

        [Authorize(Deliver.Delete)]
        public override Task<IActionResult> Delete(int id)
        {
            return base.Delete(id);
        }
    }
}