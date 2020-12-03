using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignmentLike : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("TaskAssignment")]
        public Int64 TaskAssignmentId { get; set; }
        public bool IsLiked { get; set; }

        public TaskAssignment TaskAssignment { get; set; }
    }
}
