using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class Notification : CreatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public NotificationType Type { get; set; }
        public string Body { get; set; }
        public string Data { get; set; }

        public ICollection<NotificationUser> Users { get; set; }
    }
}
