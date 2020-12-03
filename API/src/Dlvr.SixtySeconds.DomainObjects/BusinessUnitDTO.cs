using Dlvr.SixtySeconds.Models;
using System;
using System.Collections.Generic;
using System.Text;
using static Dlvr.SixtySeconds.Models.BusinessUnit;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class BusinessUnitDTO
    {
        public Int64 Id { get; set; }
        public int CountryId { get; set; }
        public int? StateId { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
        public string Email { get; set; }
        public string LogoUrl { get; set; }
        public string Terms { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<ScriptFieldDTO> ScriptFieldCollection { get; set; }
    }

    public class ScriptFieldDTO
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

    }
}
