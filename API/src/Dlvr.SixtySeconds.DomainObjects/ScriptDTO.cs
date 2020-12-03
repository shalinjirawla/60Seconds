using System;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class ScriptDTO
    {
        [Range(1, int.MaxValue)]
        [Required]
        public int TaskId { get; set; }

        [Range(1, long.MaxValue)]
        [Required]
        public long ScenarioId { get; set; }
    }
}
