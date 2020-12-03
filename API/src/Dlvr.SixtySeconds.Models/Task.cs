using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class Task : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("BusinessUnit")]
        public Int64 BusinessUnitId { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CompletedOn { get; set; }

        public BusinessUnit BusinessUnit { get; set; }
        public virtual ICollection<TaskAssignment> TaskAssignments { get; set; }
    }
}
