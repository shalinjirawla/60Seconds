﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class TaskAssignmentComment : CreatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        [ForeignKey("TaskAssignment")]
        public Int64 TaskAssignmentId { get; set; }
        public string Description { get; set; }

        public TaskAssignment TaskAssignment { get; set; }

        public List<TaskAssignmentCommentTags> Tags { get; set; }

    }
}
