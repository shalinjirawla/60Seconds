using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class VideoRehearsalDTO
    {
        public Int64 Id { get; set; }
        [Required]
        public Int64 TaskAssignmentId { get; set; }
        public string VideoUrl { get; set; }
    }

    public class VideoRehearsalResponseDTO
    {
        public long Id { get; set; }
        public string VideoUrl { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

        public string CreatedByUserName { get; set; }

        public string UpdatedByUserName { get; set; }
    }
}
