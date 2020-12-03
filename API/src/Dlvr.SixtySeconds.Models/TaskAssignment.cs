using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignment : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("Task")]
        public Int64 TaskId { get; set; }
        [ForeignKey("Scenario")]
        public Int64 ScenarioId { get; set; }
        [ForeignKey("Script")]
        public Int64 ScriptId { get; set; }
        [ForeignKey("User")]
        public Int64 AssignedTo { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime? CompletedOn { get; set; }

        public DateTime? FeaturedOn { get; set; }

        public Task Task { get; set; }
        public Scenario Scenario { get; set; }
        public Script Script { get; set; }
        public User User { get; set; }
        public ICollection<AudioRehearsal> AudioRehearsals { get; set; }
        public ICollection<VideoRehearsal> VideoRehearsals { get; set; }

        public ICollection<TaskAssignmentAction> TaskAssignmentActions { get; set; }
        public ICollection<TaskAssignmentFeedback> TaskAssignmentFeedbacks { get; set; }
        public ICollection<TaskAssignmentComment> TaskAssignmentComments { get; set; }
        public ICollection<TaskAssignmentLike> TaskAssignmentLikes { get; set; }
        public ICollection<TaskAssignmentShare> TaskAssignmentShares { get; set; }
    }
}
