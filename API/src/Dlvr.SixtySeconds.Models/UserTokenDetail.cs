using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class UserTokenDetail
    {
        [Key]
        public Guid TokenId { get; set; }
        [ForeignKey("UserSession")]
        public Guid SessionId { get; set; }
        public Guid RefreshToken { get; set; }
        public DeviceType DeviceType { get; set; }
        public string DeviceDetails { get; set; }
        public string IP { get; set; }
        public DateTime IssueOn { get; set; }
        public DateTime ExpireOn { get; set; }

        public UserSession UserSession { get; set; }
    }
}
