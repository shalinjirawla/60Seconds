using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Constants;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services
{
    public class TaskService : Service<ITaskRepository, TaskPaggerRequestDTO, TaskDTO>, ITaskService
    {
        #region "Init constructor with TaskRepository"
        public TaskService(ITaskRepository repository, ITokenDTO token, IMapper mapper, ILogger<UserService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {
        }
        #endregion

        #region "Main methods"


        public async Task<List<GetTaskAssignmentDTO>> GetTaskAssignments(long taskId)
        {
            try
            {
                return await Repository.GetTaskAssignments(taskId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<GetTaskAssignmentMobileDTO>> GetTaskListForMobile()
        {
            try
            {
                return await Repository.GetTaskListForMobile();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<long> CreateTask(CreateOrUpdateTaskDTO input)
        {
            try
            {
                return await Repository.CreateTask(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<TaskAssignmentDTO> GetTaskAssignment(long taskAssignmentId)
        {
            try
            {
                return await Repository.GetTaskAssignment(taskAssignmentId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async System.Threading.Tasks.Task CreateTaskAssignmentAction(TaskAssignmentActionDTO input)
        {
            try
            {
                await Repository.CreateTaskAssignmentAction(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async System.Threading.Tasks.Task UpdateTaskAssignment(PutTaskAssignmentDTO input)
        {
            try
            {
                await Repository.UpdateTaskAssignment(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //updating the status of taskassignment in case all assignment of task are completed then also updating the status of task to completed//
        public async Task<ResponseDTO<bool>> ApproveTaskAssignment(long taskAssignmentId)
        {
            if (taskAssignmentId > 0)
            {
                //updating the status of TaskAssignments//
                int result = await Repository.ApproveTaskAssignment(taskAssignmentId);
                if (result == 1)
                {
                    return new ResponseDTO<bool>()
                    {
                        Data = true,
                        ResponseType = ResponseType.SUCCESS,
                        Message = string.Empty
                    };
                }
                else if (result == 2)
                {
                    return new ResponseDTO<bool>()
                    {
                        ResponseType = ResponseType.ERROR,
                        Message = Localizer[Messages.ApproveTaskError, MessageKeyArg]
                    };
                }
                else
                {
                    return new ResponseDTO<bool>()
                    {
                        ResponseType = ResponseType.ERROR,
                        Message = Localizer[Messages.UpdateError, MessageKeyArg]
                    };
                }
            }
            else
            {
                return new ResponseDTO<bool>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.UpdateError, MessageKeyArg]
                };
            }
        }

        //update feature status taskAssignment//
        public async Task<ResponseDTO<bool>> UpdateFeatureStatus(long taskAssignmentId, bool isFeatured)
        {
            if (taskAssignmentId > 0)
            {
                TaskAssignmentAction entity = new TaskAssignmentAction();
                //updating the status of feature TaskAssignments//
                bool result = await Repository.UpdateFeatureStatus(taskAssignmentId, isFeatured);
                if (result)
                {
                    return new ResponseDTO<bool>()
                    {
                        Data = result,
                        ResponseType = ResponseType.SUCCESS,
                        Message = string.Empty
                    };
                }
                else
                {
                    return new ResponseDTO<bool>()
                    {
                        ResponseType = ResponseType.ERROR,
                        Message = Localizer[Messages.UpdateError, MessageKeyArg]
                    };
                }
            }
            else
            {
                return new ResponseDTO<bool>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.UpdateError, MessageKeyArg]
                };
            }
        }

        //adding record into taskAssignmentAction table to approve script//
        public async Task<ResponseDTO<bool>> ApproveScenarioScript(long taskId, long taskAssignmentId)
        {
            if (taskId > 0 && taskAssignmentId > 0)
            {
                bool result = await Repository.ApproveScenarioScript(taskId, taskAssignmentId);

                if (result)
                {
                    return new ResponseDTO<bool>()
                    {
                        Data = result,
                        ResponseType = ResponseType.SUCCESS,
                        Message = string.Empty
                    };
                }
                else
                {
                    return new ResponseDTO<bool>()
                    {
                        ResponseType = ResponseType.ERROR,
                        Message = Localizer[Messages.UpdateError, MessageKeyArg]
                    };
                }
            }
            else
            {
                return new ResponseDTO<bool>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.UpdateError, MessageKeyArg]
                };
            }
        }

        /// <summary>
        /// Delete Task Assignment with Audio, Video, Scenario and Scripts.
        /// </summary>
        /// <param name="taskAssignmentId"></param>
        /// <returns></returns>
        public async Task<ResponseDTO<bool>> DeleteTaskAssignment(long taskAssignmentId)
        {
            try
            {
                var result= await Repository.DeleteTaskAssignment(taskAssignmentId);
                if (result)
                {
                    return new ResponseDTO<bool>()
                    {
                        Data = result,
                        ResponseType = ResponseType.SUCCESS,
                        Message = string.Empty
                    };
                }
                else
                {
                    return new ResponseDTO<bool>()
                    {
                        ResponseType = ResponseType.ERROR,
                        Message = Localizer[Messages.DeleteError, MessageKeyArg]
                    };
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion        
    }
}
