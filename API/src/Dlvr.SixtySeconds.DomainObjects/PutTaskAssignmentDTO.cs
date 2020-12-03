using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class PutTaskAssignmentDTO
    {
        //TaskAssignment

        [Required]
        [Range(1, int.MaxValue)]
        public Int64 TaskAssignmentId { get; set; }
        //Scenario
        public ScenarioDTO Scenario { get; set; }
        //Script
        public List<ScriptContentDTO> ScriptContents { get; set; }
    }
}
