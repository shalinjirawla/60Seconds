using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class Auth0User
    {
        [JsonProperty("email")]
        public string email { get; set; }

        //[JsonProperty("phone_number")]
        //public string phone_number { get; set; }

        //[JsonProperty("blocked")]
        //public bool blocked { get; set; }

        [JsonProperty("email_verified")]
        public bool email_verified { get; set; } = true;

        //[JsonProperty("phone_verified")]
        //public bool phone_verified { get; set; }

        [JsonProperty("given_name")]
        public string given_name { get; set; } = string.Empty;

        [JsonProperty("family_name")]
        public string family_name { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string name { get; set; } = string.Empty;

        [JsonProperty("nickname")]
        public string nickname { get; set; } = string.Empty;

        //[JsonProperty("picture")]
        //public Uri picture { get; set; }

        [JsonProperty("user_id")]
        public string user_id { get; set; } = string.Empty;

        [JsonProperty("connection")]
        public string connection { get; set; } = "Username-Password-Authentication";

        [JsonProperty("password")]
        public string password { get; set; } = "Welcome@12345";

        [JsonProperty("verify_email")]
        public bool verify_email { get; set; } = false;

        //[JsonProperty("username")]
        //public string username { get; set; }
    }

    public class UpdateAuth0UserRequest
    {
        [JsonProperty("email")]
        public string email { get; set; }

        [JsonProperty("given_name")]
        public string given_name { get; set; } = string.Empty;

        [JsonProperty("family_name")]
        public string family_name { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string name { get; set; } = string.Empty;

        [JsonProperty("nickname")]
        public string nickname { get; set; } = string.Empty;
    }

    public class UserMetaData
    {
        public long? ReportTo { get; set; }
    }

    public class Auth0UserResponse
    {
        [JsonProperty("user_id")]
        public string UserId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("email_verified")]
        public bool EmailVerified { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("phone_number")]
        public string PhoneNumber { get; set; }

        [JsonProperty("phone_verified")]
        public bool PhoneVerified { get; set; }

        [JsonProperty("created_at")]
        public string CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public string UpdatedAt { get; set; }

        [JsonProperty("picture")]
        public string Picture { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("nickname")]
        public string Nickname { get; set; }

        [JsonProperty("multifactor")]
        public string[] Multifactor { get; set; }

        [JsonProperty("last_ip")]
        public string LastIp { get; set; }

        [JsonProperty("last_login")]
        public string LastLogin { get; set; }

        [JsonProperty("logins_count")]
        public long LoginsCount { get; set; }

        [JsonProperty("blocked")]
        public bool Blocked { get; set; }

        [JsonProperty("given_name")]
        public string GivenName { get; set; }

        [JsonProperty("family_name")]
        public string FamilyName { get; set; }
    }

    public class Auth0AccessTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("scope")]
        public string Scope { get; set; }

        [JsonProperty("expires_in")]
        public long ExpiresIn { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }
    }

    public class Auth0UserProfileResponse
    {
        [JsonProperty("Sub")]
        public string Sub { get; set; }

        [JsonProperty("given_name")]
        public string GivenName { get; set; } = string.Empty;

        [JsonProperty("family_name")]
        public string FamilyName { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("nickname")]
        public string Nickname { get; set; } = string.Empty;

        [JsonProperty("picture")]
        public string Picture { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }

    public class Auth0Permission
    {
        [JsonProperty("permission_name")]
        public string PermissionName { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}
