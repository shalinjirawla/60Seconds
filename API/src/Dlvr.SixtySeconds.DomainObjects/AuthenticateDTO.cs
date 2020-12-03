using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class AuthenticateDTO
    {
        public GrantType GrantType { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Auth0Id { get; set; }

        public string Auth0Token { get; set; }

        public Guid? RefreshToken { get; set; }
        public string AccessToken { get; set; }
    }

    public class AuthenticateResponseDTO
    {
        public long UserId { get; set; }
     
        public string RoleName { get; set; }

        public string AccessToken { get; set; }

        public List<Auth0Permission> Permissions { get; set; }

        //public Guid TokenId { get; set; }

        public Guid RefreshToken { get; set; }

        public DateTime Expires { get; set; }
    }

    public class DeviceDetailDTO
    {
        public string IP { get; set; }
        public DeviceType DeviceType { get; set; }
        public string DeviceDetails { get; set; }
        //public string AccessToken { get; set; }
    }
}
