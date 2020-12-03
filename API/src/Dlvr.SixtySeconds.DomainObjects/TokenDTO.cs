using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class TokenDTO : ITokenDTO
    {
        public long Id { get; set; }

        public string Auth0Id { get; set; }
        public long BusinessUnitId { get; set; }
        public int RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Guid TokenId { get; set; }
        public long? ReportTo { get; set; }
        public Guid SessionId { get; set; }
        public string Permissions { get; set; }

        public bool IsAuthorized()
        {
            return Id > 0;
        }
    }
    public interface ITokenDTO
    {
        bool IsAuthorized();

        long Id { get; set; }
        long BusinessUnitId { get; set; }
        int RoleId { get; set; }
        long? ReportTo { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Phone { get; set; }
        string Email { get; set; }
        public Guid TokenId { get; set; }
        public Guid SessionId { get; set; }
        public string Permissions { get; set; }
    }
}
