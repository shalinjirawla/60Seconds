using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TaskAssignmentDTO
    {
        public TaskAssignmentScenarioDTO Scenario { get; set; }
        public TaskAssignmentScriptDTO Script { get; set; }
        public ICollection<VideoRehearsalResponseDTO> VideoRehearsals { get; set; }
        public bool AudioRehearsalStatus { get; set; }
        public bool ScenarioActionStatus { get; set; }
        public bool ScriptActionStatus { get; set; }
        public bool VideoActionStatus { get; set; }
        public TaskAssignmentActionResponseDTO LastAction { get; set; }
        public TaskAssignmentActionResponseDTO LastScenarioAction { get; set; }
        public TaskAssignmentActionResponseDTO LastScriptAction { get; set; }
        public TaskAssignmentActionResponseDTO LastVideoAction { get; set; }
        public DateTime? VideoSubmittedOn { get; set; }
        public string CreatedByUserName { get; set; }
        public string UpdatedByUserName { get; set; }

        public bool IsCompleted { get; set; }
        public DateTime? CompletedOn { get; set; }

        public bool IsFeatured { get; set; }
        public DateTime? FeaturedOn { get; set; }
    }
    public class TaskAssignmentScenarioDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string Situation { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string CreatedByUserName { get; set; }
        public string UpdatedByUserName { get; set; }
        //ScenarioKeywords
        public List<ScenarioKeywordDTO> ScenarioKeywords { get; set; }
    }
    public class TaskAssignmentScriptDTO
    {
        public long Id { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string CreatedByUserName { get; set; }
        public string UpdatedByUserName { get; set; }
        //ScriptContent
        public List<TaskScriptContentDTO> TaskScriptContents { get; set; }
    }
    public class TaskScriptContentDTO
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string ScriptFieldvalue { get; set; }
    }
}
