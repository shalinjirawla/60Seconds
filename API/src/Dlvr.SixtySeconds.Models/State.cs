using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class State
    {
        public int Id { get; set; }

        [ForeignKey("Country")]
        public int CountryId { get; set; }
        public string Name { get; set; }

        public Country Country { get; set; }
    }
}
