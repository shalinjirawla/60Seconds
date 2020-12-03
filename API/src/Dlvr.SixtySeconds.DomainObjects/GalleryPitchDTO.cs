using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class GalleryPitchDTO
    {
        public string AssigneeName { get; set; }
        public string AssigneeRole { get; set; }
        public string AssigneePhoto { get; set; }
        public string VideoRehearsalUrl { get; set; }
        public DateTime? FeaturedOn { get; set; }
        public long TaskId { get; set; }
        public long TaskAssignmentId { get; set; }
        public string TaskTitle { get; set; }
        //ScriptContent
        public IEnumerable<TaskScriptContentDTO> ScriptContents { get; set; }
        public bool IsLiked { get; set; }
        public int LikesCount { get; set; }
        public int CommentsCount { get; set; }
        public int Share { get; set; }
        public string ShareableUrl { get; set; }
    }

    public class PitchShareDTO
    { 
        public List<long> Users { get; set; }
    }
}
