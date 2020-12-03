using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class GetTaskAssignmentDTO
    {
        public long Id { get; set; }
        public long BusinessUnitId { get; set; }
        public long AssigneeId { get; set; }
        public string AssigneeName { get; set; }
        public string AssigneeRole { get; set; }
        public string PhotoUrl { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedByUserName { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedByUserName { get; set; }
        public bool AudioRehearsalStatus { get; set; }
        public AssignmentAction ScenarioActionStatus { get; set; }
        public AssignmentAction ScriptActionStatus { get; set; }
        public AssignmentAction VideoActionStatus { get; set; }
        public AssignmentAction RecentAction { get; set; }
        public string Web_Message { get; set; }
    }
    public class GetTaskAssignmentMobileDTO
    {
        public long TaskId { get; set; }
        public string TaskTitle { get; set; }
        public long TaskAssignmentId { get; set; }
        public bool AudioRehearsalStatus { get; set; }
        public AssignmentAction ScenarioActionStatus { get; set; }
        public AssignmentAction ScriptActionStatus { get; set; }
        public AssignmentAction VideoActionStatus { get; set; }
        public AssignmentAction RecentAction { get; set; }
        public IEnumerable<TaskAssignmentActionResponseDTO> PerformedActions { get; set; }
        public string MobileTop_Message { get; set; }
        public string MobileBottom_Message { get; set; }
        public DateTime? MobileBottom_DateTime { get; set; }
    }
}
