using System;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class RoleResponseDTO
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
