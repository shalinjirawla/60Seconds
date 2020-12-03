using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface ITaskRepository : IRepository<TaskPaggerRequestDTO, TaskDTO>
    {
        Task<List<GetTaskAssignmentDTO>> GetTaskAssignments(long taskId);
        Task<long> CreateTask(CreateOrUpdateTaskDTO input);
        System.Threading.Tasks.Task UpdateTaskAssignment(PutTaskAssignmentDTO input);
        Task<int> ApproveTaskAssignment(long taskAssignmentId);
        Task<bool> UpdateFeatureStatus(long taskAssignmentId, bool isFeatured);
        Task<bool> ApproveScenarioScript(long taskId, long taskAssignmentId);
        Task<TaskAssignmentDTO> GetTaskAssignment(long taskAssignmentId);
        System.Threading.Tasks.Task CreateTaskAssignmentAction(TaskAssignmentActionDTO input);
        Task<List<GetTaskAssignmentMobileDTO>> GetTaskListForMobile();
        Task<bool> DeleteTaskAssignment(long taskAssignmentId);
    }
}
