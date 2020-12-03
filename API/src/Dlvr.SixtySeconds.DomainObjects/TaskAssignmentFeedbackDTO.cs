using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TaskAssignmentFeedbackDTO
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
    }

    public class TaskAssignmentFeedbackPaggerRequestDTO : PaggerRequestDTO
    {
        [Range(1, long.MaxValue)]
        [Required]
        public long TaskAssignmentId { get; set; }

        public long? ScenarioId { get; set; }

        public long? ScriptId { get; set; }

        public long? AudioRehearsalId { get; set; }

        public long? VideoRehearsalId { get; set; }
    }
}
