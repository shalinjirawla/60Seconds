using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class UserResponseDTO : UserDTO
    {
        public long BusinessUnitId { get; set; }

        public string BusinessUnitName { get; set; }

        public string RoleName { get; set; }

        public string ReportToUserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? UpdatedOn { get; set; }
    }
    public class TeamMemberDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public TeamType Type { get; set; }
    }
}
