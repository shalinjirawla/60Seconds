using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class UserSession
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("User")]
        public Int64 UserId { get; set; }
        [ForeignKey("BusinessUnit")]
        public Int64 BusinessUnitId { get; set; }
        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public DateTime LoginDate { get; set; }
        public DateTime? LogOffDate { get; set; }
        public Role Role { get; set; }
        public User User { get; set; }
        public BusinessUnit BusinessUnit { get; set; }
    }
}
