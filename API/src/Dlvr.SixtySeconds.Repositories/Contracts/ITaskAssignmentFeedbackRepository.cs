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
    public interface ITaskAssignmentFeedbackRepository : ICreateDeleteRepository<TaskAssignmentFeedbackPaggerRequestDTO, TaskAssignmentFeedbackDTO, TaskAssignmentFeedbackResponseDTO>
    {
        
    }
}
