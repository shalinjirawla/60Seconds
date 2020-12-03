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
    public class TaskAssignmentCommentController : CreateDeleteController<ITaskAssignmentCommentService, TaskAssignmentCommentPaggerRequestDTO, TaskAssignmentCommentDTO, TaskAssignmentCommentResponseDTO>
    {
        public TaskAssignmentCommentController(ITaskAssignmentCommentService service, ILogger<TaskAssignmentCommentController> logger) : base(service, logger)
        {
        }

        [Authorize(Comment.Read)]
        public override async Task<IActionResult> Get(int id)
        {
            return await base.Get(id);
        }

        [Authorize(Comment.Read)]
        public override Task<IActionResult> Get([FromQuery] TaskAssignmentCommentPaggerRequestDTO request)
        {
            return base.Get(request);
        }

        [Authorize(Comment.Create)]
        public override async Task<IActionResult> Post([FromBody] TaskAssignmentCommentDTO request)
        {
            return await base.Post(request);
        }

        [Authorize(Comment.Delete)]
        public override Task<IActionResult> Delete(int id)
        {
            return base.Delete(id);
        }
    }
}