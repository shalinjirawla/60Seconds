using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class BusinessUnitUser
    {
        [ForeignKey("User")]
        public Int64 UserId { get; set; }
        [ForeignKey("BusinessUnit")]
        public Int64 BusinessUnitId { get; set; }
        [ForeignKey("Role")]
        public int RoleId { get; set; }

        public User User { get; set; }
        public BusinessUnit BusinessUnit { get; set; }
        public Role Role { get; set; }
    }
}
