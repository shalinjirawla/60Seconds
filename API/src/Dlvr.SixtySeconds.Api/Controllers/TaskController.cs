using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Constants;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using static Dlvr.SixtySeconds.Shared.Constants.Scope;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : BaseController<ITaskService, TaskPaggerRequestDTO, TaskDTO>
    {
        #region"Private variables declaration"
        private readonly IStringLocalizer<Resource> _l;
        #endregion

        #region"Injecting Service and Logger"
        public TaskController(ITaskService taskService, ILogger<TaskController> logger, IStringLocalizer<Resource> localizer) : base(taskService, logger)
        {
            _l = localizer;
        }
        #endregion

        #region"Main Methods"
        [Authorize(Scope.Task.Create)]
        [HttpPost]
        public async Task<ActionResult> CreateTask([FromBody] CreateOrUpdateTaskDTO input)
        {
            try
            {
                var taskId = await Service.CreateTask(input);
                if (taskId > 0)
                {
                    return Ok(new ResponseDTO<long>()
                    {
                        Data = taskId,
                        ResponseType = ResponseType.SUCCESS,
                        Message = _l[Messages.PostTaskSuccess],
                    });
                }
                return Ok(new ResponseDTO()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = "Something went Wrong"
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize(Scope.Task.AllRead)]
        public override Task<IActionResult> Get([FromQuery] TaskPaggerRequestDTO request)
        {
            return base.Get(request);
        }
                

        [Authorize(Scope.Task.AssignmentRead)]
        [Route("{taskId:long}/TaskAssignments")]
        [HttpGet]
        public async Task<ActionResult> GetTaskAssignments(long taskId)
        {
            try
            {
                var data = await Service.GetTaskAssignments(taskId);
                return Ok(new ResponseDTO<List<GetTaskAssignmentDTO>>()
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

        [Authorize(Scope.Task.UserRead)]
        [Route("GetUserTaskList")]
        [HttpGet]
        public async Task<ActionResult> GetTaskListForMobile()
        {
            try
            {
                var data = await Service.GetTaskListForMobile();
                return Ok(new ResponseDTO<List<GetTaskAssignmentMobileDTO>>()
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

        [Authorize(Scope.Task.AssignmentDetailRead)]
        [Route("{taskId:long}/TaskAssignments/{taskAssignmentId:long}")]
        [HttpGet]
        public async Task<ActionResult> GetTaskAssignment(long taskId, long taskAssignmentId)
        {
            try
            {
                var data = await Service.GetTaskAssignment(taskAssignmentId);
                return Ok(new ResponseDTO<TaskAssignmentDTO>()
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

        [Authorize(Scope.Task.Update)]
        [Route("{taskId:long}/TaskAssignment")]
        [HttpPut]
        public async Task<ActionResult> UpdateTaskAssignment(long taskId, [FromBody] PutTaskAssignmentDTO input)
        {
            try
            {
                await Service.UpdateTaskAssignment(input);
                return Ok(new ResponseDTO()
                {
                    ResponseType = ResponseType.SUCCESS,
                    Message = _l[Messages.PutTaskAssignmentSuccess],
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("{taskId:long}/TaskAssignment/{taskAssignmentId:long}/Action")]
        [HttpPost]
        public async Task<ActionResult> CreateTaskAssignmentAction(long taskId, long taskAssignmentId, TaskAssignmentActionDTO input)
        {
            try
            {
                await Service.CreateTaskAssignmentAction(input);
                return Ok(new ResponseDTO()
                {
                    ResponseType = ResponseType.SUCCESS,
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        ////updating the status of taskassignment in case all assignment of task are completed then also updating the status of task to completed//
        [Authorize(Scope.Task.VideoApproveUpdate)]
        [HttpPut]
        [Route("{taskId:long}/ApproveVideo/{taskAssignmentId:long}")]
        public async Task<IActionResult> ApproveTaskAssignment(long taskId, long taskAssignmentId)
        {
            try
            {
                return Ok(await Service.ApproveTaskAssignment(taskAssignmentId));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        //updating the status of feature TaskAssignments//
        [Authorize(Scope.Task.FeatureCreateUdpate)]
        [HttpPut]
        [Route("{taskId:long}/FeatureStatus/{taskAssignmentId:long}/{isFeatured:bool}")]
        public async Task<IActionResult> UpdateFeatureStatus(long taskId, long taskAssignmentId, bool isFeatured)
        {
            try
            {
                return Ok(await Service.UpdateFeatureStatus(taskAssignmentId, isFeatured));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [Authorize(Scope.Task.ScriptApproveUpdate)]
        [HttpPut]
        [Route("{taskId:long}/ApproveScenarioScript/{taskAssignmentId:long}")]
        public async Task<IActionResult> ApproveScenarioScript(long taskId, long taskAssignmentId)
        {
            try
            {
                return Ok(await Service.ApproveScenarioScript(taskId, taskAssignmentId));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [Authorize(Scope.Task.AssignmentDelete)]
        [HttpDelete]
        [Route("TaskAssignment/{taskAssignmentId:long}")]
        public async Task<IActionResult> DeleteTaskAssignment(long taskAssignmentId) 
        {
            try
            {
                return Ok(await Service.DeleteTaskAssignment(taskAssignmentId));
            }
            catch (Exception e)
            {
                return CatchError(e);
            }
        }
        #endregion
    }
}