using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignmentAction : CreatedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("Task")]
        public Int64 TaskId { get; set; }
        [ForeignKey("TaskAssignment")]
        public Int64 TaskAssignmentId { get; set; }
        public AssignmentAction Action { get; set; }

        public Task Task { get; set; }
        public TaskAssignment TaskAssignment { get; set; }
    
        
    }
}
