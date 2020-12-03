using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class AssignmentActionMessageDTO
    {
        public string Web_Message { get; set; }
        public string MobileTop_Message { get; set; }
        public string MobileBottom_Message { get; set; }
    }
}
