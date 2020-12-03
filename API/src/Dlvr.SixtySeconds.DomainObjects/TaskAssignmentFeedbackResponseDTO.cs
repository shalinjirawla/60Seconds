using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TaskAssignmentFeedbackResponseDTO
    {
        [Required]
        public Int64 Id { get; set; }
        [Required]
        public Int64 TaskAssignmentId { get; set; }
        public Int64? ScenarioId { get; set; }
        public Int64? ScriptId { get; set; }
        public Int64? AudioRehearsalId { get; set; }
        public Int64? VideoRehearsalId { get; set; }
        public string Description { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PictureUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public long CreatedBy { get; set; }
    }

}
