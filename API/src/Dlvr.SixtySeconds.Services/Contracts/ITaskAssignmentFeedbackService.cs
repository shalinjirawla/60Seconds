using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface ITaskAssignmentFeedbackService : ICreateDeleteService<TaskAssignmentFeedbackPaggerRequestDTO, TaskAssignmentFeedbackDTO, TaskAssignmentFeedbackResponseDTO>
    {

    }
}
