using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class UserDeviceToken : CreatedUpdatedDeletedByBaseModel
    {
        public Int64 Id { get; set; }
        [ForeignKey("UserSession")]
        public Guid UserSessionId { get; set; }
        public string DeviceToken { get; set; }
        public DeviceType DeviceType { get; set; }
        public UserSession UserSession { get; set; }
    }
}
