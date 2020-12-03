using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class AudioRehearsalDTO
    {
        public Int64 Id { get; set; }
        [Required]
        public Int64 TaskAssignmentId { get; set; }
    }
}
