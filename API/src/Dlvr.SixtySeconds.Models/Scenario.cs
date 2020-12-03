using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class Scenario : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("Task")]
        public Int64 TaskId { get; set; }

        public string Title { get; set; }
        public string Audience { get; set; }
        public string Situation { get; set; }

        public Task Task { get; set; }
    }
}
