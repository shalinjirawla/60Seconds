using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using static Dlvr.SixtySeconds.Shared.Constants.Scope;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : BaseController<IGalleryService, PaggerRequestDTO, GalleryPitchDTO>
    {
        #region"Injecting Service and Logger"
        public GalleryController(IGalleryService Service, ILogger<TaskController> logger) : base(Service, logger)
        {
        }
        #endregion

        [Authorize(Gallery.Read)]
        public override Task<IActionResult> Get([FromQuery] PaggerRequestDTO request)
        {
            return base.Get(request);
        }

        [Authorize(Pitch.Read)]
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult> GetTaskAssignments(long id)
        {
            try
            {
                var data = await Service.GalleryPitch(id);
                return Ok(new ResponseDTO<GalleryPitchDTO>()
                {
                    ResponseType = ResponseType.SUCCESS,
                    Data = data
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize(Pitch.LikeCreateUpdate)]
        [HttpPut]
        [Route("{taskAssignmentId:long}/LikeUnlikePitch/{isLiked:bool}")]
        public async Task<IActionResult> LikeUnlikeTaskAssignment(long taskAssignmentId, bool isLiked)
        {
            try
            {
                return Ok(await Service.LikeUnlikeTaskAssignment(taskAssignmentId, isLiked));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize(Pitch.Share)]
        [HttpPost]
        [Route("{taskAssignmentId:long}/Share")]
        public async Task<IActionResult> Share(long taskAssignmentId, [FromBody] PitchShareDTO input)
        {
            try
            {
                return Ok(await Service.ShareTaskAssignment(taskAssignmentId, input.Users));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}