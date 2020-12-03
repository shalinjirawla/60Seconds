using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface ITaskService : IService<TaskPaggerRequestDTO, TaskDTO>
    {
        Task<List<GetTaskAssignmentDTO>> GetTaskAssignments(long taskId);
        Task<long> CreateTask(CreateOrUpdateTaskDTO input);
        Task UpdateTaskAssignment(PutTaskAssignmentDTO input);
        Task<ResponseDTO<bool>> ApproveTaskAssignment(long taskAssignmentId);
        Task<ResponseDTO<bool>> UpdateFeatureStatus(long taskAssignmentId, bool isFeatured);
        Task<ResponseDTO<bool>> ApproveScenarioScript(long taskId, long taskAssignmentId);
        Task<TaskAssignmentDTO> GetTaskAssignment(long taskAssignmentId);
        Task<List<GetTaskAssignmentMobileDTO>> GetTaskListForMobile();
        Task CreateTaskAssignmentAction(TaskAssignmentActionDTO input);
        Task<ResponseDTO<bool>> DeleteTaskAssignment(long taskAssignmentId);
    }
}
