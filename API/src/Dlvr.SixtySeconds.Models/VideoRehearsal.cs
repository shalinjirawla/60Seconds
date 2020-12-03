using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class VideoRehearsal : CreatedDeletedByBaseModel
    {
        public Int64 Id { get; set; }
        [ForeignKey("TaskAssignment")]
        public Int64 TaskAssignmentId { get; set; }
        public string VideoUrl { get; set; }

        public TaskAssignment TaskAssignment { get; set; }
    }
}
