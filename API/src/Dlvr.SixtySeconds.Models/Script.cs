using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class Script : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("Task")]
        public Int64 TaskId { get; set; }
        [ForeignKey("Scenario")]
        public Int64 ScenarioId { get; set; }

        public Task Task { get; set; }
        public Scenario Scenario { get; set; }
        public ICollection<ScriptContent> ScriptContents { get; set; }

    }
}
