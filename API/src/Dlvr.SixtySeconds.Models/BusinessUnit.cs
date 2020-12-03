using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class BusinessUnit : CreatedUpdatedDeletedByBaseModel
    {
        [Key]
        public Int64 Id {get; set; }
        [ForeignKey("Country")]
        public int CountryId { get; set; }
        [ForeignKey("State")]
        public int? StateId { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
        public string Email { get; set; }
        public string LogoUrl { get; set; }
        public string Terms { get; set; }

        [NotMapped]
        public List<ScriptField> ScriptFieldCollection { get; set; }

        public string ScriptFields
        {
            get
            {
                return ScriptFieldCollection != null ? JsonConvert.SerializeObject(ScriptFieldCollection) : null;
            }
            set
            {
                ScriptFieldCollection = !string.IsNullOrEmpty(value) ? JsonConvert.DeserializeObject<List<ScriptField>>(value) : null;
            }
        }

        public Country Country { get; set; }
        public State State { get; set; }

        public ICollection<BusinessUnitUser> Users { get; set; }

        public ICollection<NotificationUser> Notifications { get; set; }

        public class ScriptField
        {
            public int Id { get; set; }
            public int Index { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }
        }

    }
}
        