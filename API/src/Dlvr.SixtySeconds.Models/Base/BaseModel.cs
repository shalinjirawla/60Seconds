using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dlvr.SixtySeconds.Models
{
    public class BaseModel
    {
        
    }

    public class CreatedByBaseModel : BaseModel
    {
        [ForeignKey("CreatedByUser")]
        public Int64? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        public User CreatedByUser { get; set; }
    }

    public class CreatedDeletedByBaseModel : CreatedByBaseModel
    {
        [ForeignKey("DeletedByUser")]
        public Int64? DeletedBy { get; set; }
        public DateTime? DeletedOn { get; set; }

        public User DeletedByUser { get; set; }
    }

    public class CreatedUpdatedDeletedByBaseModel : CreatedDeletedByBaseModel
    {
        [ForeignKey("UpdatedByUser")]
        public Int64? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

        public User UpdatedByUser { get; set; }
    }
}
