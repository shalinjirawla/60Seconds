using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class User : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public long Id { get; set; }
        public string Auth0Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PictureUrl { get; set; }

        [ForeignKey("ReportToUser")]
        public long? ReportTo { get; set; }        
        public User ReportToUser { get; set; }

        public ICollection<BusinessUnitUser> Roles { get; set; }

        public ICollection<NotificationUser> Notifications { get; set; }
    }
}
