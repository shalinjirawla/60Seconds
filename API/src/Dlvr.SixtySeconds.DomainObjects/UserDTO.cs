using System;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class UserDTO
    {
        [Range(0, long.MaxValue)]
        public long Id { get; set; }

        public string Auth0Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        public string PictureUrl { get; set; }

        [Range(1, int.MaxValue)]
        [Required]
        public int RoleId { get; set; }

        [Range(1, long.MaxValue)]
        public long? ReportTo { get; set; }
    }
}
