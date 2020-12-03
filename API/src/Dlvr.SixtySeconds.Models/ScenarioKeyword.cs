using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class ScenarioKeyword
    {
        [Key]
        public Int64 Id { get; set; }

        [ForeignKey("BusinessUnitKeyword")]
        public Int64 KeywordId { get; set; }
        [ForeignKey("Scenario")]
        public Int64 ScenarioId { get; set; }

        public BusinessUnitKeyword BusinessUnitKeyword { get; set; }
        public Scenario Scenario { get; set; }
    }
}
