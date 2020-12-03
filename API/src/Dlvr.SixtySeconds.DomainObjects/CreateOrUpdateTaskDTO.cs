using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class CreateOrUpdateTaskDTO
    {
        //Task
        [Required]
        public string Title { get; set; }
        
        //Scenario
        public ScenarioDTO Scenario { get; set; }

        //Script
        public List<ScriptContentDTO> ScriptContents { get; set; }

        //Task Assignment
        public List<CreateTaskAssignmentDTO> TaskAssignments { get; set; }
    }
    public class ScenarioDTO
    {
        [Required]
        public string ScenarioTitle { get; set; }

        public string Audience { get; set; }
        public string Situation { get; set; }

        //ScenarioKeywords
        public List<ScenarioKeywordDTO> ScenarioKeywords { get; set; }
    }
    public class ScenarioKeywordDTO
    {
        public Int64 KeywordId { get; set; }
        public string Name { get; set; }
    }
    public class ScriptContentDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int ScriptFieldId { get; set; }

        [Required]
        public string ScriptFieldvalue { get; set; }
    }
    public class CreateTaskAssignmentDTO
    {
        //TaskAssignment
        [Required]
        [Range(1, int.MaxValue)]
        public Int64 AssignedTo { get; set; }
    }
}
