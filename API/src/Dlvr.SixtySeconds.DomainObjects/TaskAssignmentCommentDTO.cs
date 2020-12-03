using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TaskAssignmentCommentDTO
    {
        public Int64 Id { get; set; }
        [Required]
        public Int64 TaskAssignmentId { get; set; }
        public string Description { get; set; }
        public List<CommentTagsDTO> CommentTags { get; set; }
    }
    public class CommentTagsDTO
    {
        public long Id { get; set; }
        public TeamType Type { get; set; }
    }
    public class TaskAssignmentCommentPaggerRequestDTO : PaggerRequestDTO
    {
        [Range(1, long.MaxValue)]
        [Required]
        public long TaskAssignmentId { get; set; }
    }
}
