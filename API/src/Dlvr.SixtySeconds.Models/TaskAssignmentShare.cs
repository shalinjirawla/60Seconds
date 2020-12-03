using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignmentShare : CreatedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("TaskAssignment")]
        public Int64 TaskAssignmentId { get; set; }
        [ForeignKey("User")]
        public Int64 ToUser { get; set; }

        public TaskAssignment TaskAssignment { get; set; }
        public User User { get; set; }
    }
}
