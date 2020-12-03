using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class CreateOrUpdateScenarioDTO
    {
        public long TaskId { get; set; }
        public long ScenarioId { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string Situation { get; set; }
    }
}
