using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignmentFeedback : CreatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("TaskAssignment")]
        public Int64 TaskAssignmentId { get; set; }
        [ForeignKey("Scenario")]
        public Int64? ScenarioId { get; set; }
        [ForeignKey("Script")]
        public Int64? ScriptId { get; set; }
        [ForeignKey("AudioRehearsal")]
        public Int64? AudioRehearsalId { get; set; }
        public Int64? VideoRehearsalId { get; set; }
        public string Description { get; set; }

        public TaskAssignment TaskAssignment { get; set; }
        public Scenario Scenario { get; set; }
        public Script Script { get; set; }
        public AudioRehearsal AudioRehearsal { get; set; }
        public VideoRehearsal VideoRehearsal { get; set; }
    }
}
