using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class NotificationUser
    {
        [ForeignKey("Notification")]
        public Int64 NotificationId { get; set; }
        [ForeignKey("User")]
        public Int64 UserId { get; set; }
        [ForeignKey("BusinessUnit")]
        public Int64 BusinessUnitId { get; set; }

        public Notification Notification { get; set; }
        public User User { get; set; }
        public BusinessUnit BusinessUnit { get; set; }
    }
}
