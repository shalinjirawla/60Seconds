using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class BusinessUnitKeyword
    {
        [Key]
        public Int64 Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("BusinessUnit")]
        public Int64 BusinessUnitId { get; set; }

        public BusinessUnit BusinessUnit { get; set; }
    }
}
