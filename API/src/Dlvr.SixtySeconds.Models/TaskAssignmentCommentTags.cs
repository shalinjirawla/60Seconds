using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignmentCommentTags
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Comment")]
        public long CommentId { get; set; }

        [ForeignKey("User")]
        public long? UserId { get; set; }

        [ForeignKey("BusinessUnit")]
        public long? BusinessUnitId { get; set; }

        public TeamType Type { get; set; }

        public TaskAssignmentComment Comment { get; set; }

        public User User { get; set; }

        public BusinessUnit BusinessUnit { get; set; }
    }
}
