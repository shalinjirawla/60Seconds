using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Dlvr.SixtySeconds.Shared.Constants.Scope;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AudioRehearsalController : CreateDeleteController<IAudioRehearsalService, PaggerRequestDTO, AudioRehearsalDTO, AudioRehearsalDTO>
    {
        public AudioRehearsalController(IAudioRehearsalService service, ILogger<AudioRehearsalController> logger) : base(service, logger)
        {
        }

        [Authorize(Rehearse.Read)]
        public override Task<IActionResult> Get([FromQuery] PaggerRequestDTO request)
        {
            return base.Get(request);
        }

        [Authorize(Rehearse.Read)]
        public override async Task<IActionResult> Get(int id)
        {
            return await base.Get(id);
        }

        [Authorize(Rehearse.Create)]
        public override async Task<IActionResult> Post([FromBody] AudioRehearsalDTO request)
        {
            return await base.Post(request);
        }

        [Authorize(Rehearse.Delete)]
        public override Task<IActionResult> Delete(int id)
        {
            return base.Delete(id);
        }
    }
}