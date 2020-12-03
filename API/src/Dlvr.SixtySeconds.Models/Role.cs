using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class Role : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Auth0RoleId { get; set; }
        public string Name { get; set; }
        public ICollection<BusinessUnitUser> Users { get; set; }
    }
}
