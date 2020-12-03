using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
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
    public class TaskAssignmentFeedbackController : CreateDeleteController<ITaskAssignmentFeedbackService, TaskAssignmentFeedbackPaggerRequestDTO, TaskAssignmentFeedbackDTO, TaskAssignmentFeedbackResponseDTO>
    {
        public TaskAssignmentFeedbackController(ITaskAssignmentFeedbackService service, ILogger<TaskAssignmentFeedbackController> logger) : base(service, logger)
        {
        }

        [Authorize(Feedback.Read)]
        public override async Task<IActionResult> Get([FromQuery]TaskAssignmentFeedbackPaggerRequestDTO request)
        {
            try
            {
                if (request.TaskAssignmentId <= 0 || (request.ScenarioId.GetValueOrDefault() <= 0 && request.ScriptId.GetValueOrDefault() <= 0 && request.AudioRehearsalId.GetValueOrDefault() <= 0 && request.VideoRehearsalId.GetValueOrDefault() <= 0))
                {
                    return BadRequest();
                }

                return await base.Get(request);
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [Authorize(Feedback.Read)]
        public override Task<IActionResult> Get(int id)
        {
            return base.Get(id);
        }

        [Authorize(Feedback.Create)]
        public override async Task<IActionResult> Post([FromBody] TaskAssignmentFeedbackDTO request)
        {
            try
            {
                if (!ModelState.IsValid || (request.ScriptId == null && request.ScenarioId == null && request.AudioRehearsalId == null && request.VideoRehearsalId == null))
                {
                    return BadRequest();
                }

                return await base.Post(request);
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [Authorize(Feedback.Delete)]
        public override async Task<IActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }
    }
}