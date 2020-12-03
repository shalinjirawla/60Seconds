using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TaskAssignmentActionDTO
    {
        public AssignmentAction Action { get; set; }
        public long TaskAssignmentId { get; set; }
        public DateTime? CreatedOn { get; set; }
    }

    public class TaskAssignmentActionResponseDTO
    {
        public AssignmentAction Action { get; set; }
        public DateTime CreatedOn { get; set; }
        public AssignmentActionMessageDTO Message { get; set; }
    }
}
