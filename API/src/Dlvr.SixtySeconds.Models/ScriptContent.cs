using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dlvr.SixtySeconds.Models
{
    public class ScriptContent
    {
        public Int64 Id { get; set; }
        [ForeignKey("Script")]
        public Int64 ScriptId { get; set; }
        public int ScriptFieldId { get; set; }
        public string ScriptFieldvalue { get; set; }

        public Script Script { get; set; }
    }
}
