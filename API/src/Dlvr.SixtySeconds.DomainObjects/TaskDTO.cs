using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TaskDTO
    {
        public Int64 Id { get; set; }
        public Int64 BusinessUnitId { get; set; }
        public string Title { get; set; }
        public string TaskManagerName { get; set; }
        public string PhotoUrl { get; set; }
        public int Status { get; set; }
        public int StatusInPercentage { get; set; }
        public int Submissions { get; set; }
        public int Assignees { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CompletedOn { get; set; }
        public Int64? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public Int64? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public class TaskPaggerRequestDTO : PaggerRequestDTO
    { 
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public TaskStatus TaskStatus { get; set; }
    }
}
