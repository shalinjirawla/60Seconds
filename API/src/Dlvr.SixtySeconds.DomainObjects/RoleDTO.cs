using System;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class RoleDTO
    {
        [Range(0, long.MaxValue)]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
