using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class Auth0UserRepository : Repository, IAuth0UserRepository
    {
        private string _auth0Token = string.Empty;
        private IConfiguration _configuration;

        public Auth0UserRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper, IConfiguration configuration) : base(context, token, mapper)
        {
            _configuration = configuration;
        }

        public string Auth0Token
        {
            get
            {
                if (!string.IsNullOrEmpty(_auth0Token))
                {
                    return _auth0Token;
                }
                else
                {
                    _auth0Token = GetAuth0AccessToken().Result;

                    return _auth0Token;
                }
            }
        }

        public async Task<string> Create(UserDTO dto)
        {
            var auth0User = await GetAuth0UserByEmail(dto.Email);

            if (auth0User != null)
            {
                await UpdateUser(dto, auth0User.UserId);

                return auth0User.UserId;
            }
            else
            {
                RestClient client = new RestClient(_configuration["Auth0:Domain"]);
                var request = new RestRequest("/api/v2/users", Method.POST);

                request.AddHeader("Authorization", $"bearer {Auth0Token}");

                var body = Mapper.Map<Auth0User>(dto);

                request.AddJsonBody(body);

                IRestResponse<Auth0UserResponse> response = await client.ExecuteAsync<Auth0UserResponse>(request);

                if (response.IsSuccessful && response.Data != null)
                {
                    string userid = response.Data.UserId;

                    await ResetPassword(dto);
                    await AssignRole(userid, dto);
                }

                return response.Data.UserId;
            }
        }

        private async Task<bool> ResetPassword(UserDTO dto)
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);
            var request = new RestRequest("/dbconnections/change_password", Method.POST);

            request.AddHeader("content-type", "application/json");

            var body = new
            {
                client_id = _configuration["Auth0:ClientId"],
                email = dto.Email,
                connection = _configuration["Auth0:Connection"]
            };

            request.AddJsonBody(body);

            //request.AddParameter("application/json", "{\"client_id\": \"YOUR_CLIENT_ID\",\"email\": \"\",\"connection\": \"Username-Password-Authentication\"}", ParameterType.RequestBody);
            IRestResponse response = await client.ExecuteAsync(request);

            return response.IsSuccessful;
        }

        private async Task<bool> AssignRole(string userid, UserDTO dto)
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);
            var request = new RestRequest($"/api/v2/users/{userid}/roles", Method.POST);

            request.AddHeader("Authorization", $"bearer {Auth0Token}");

            string role = await GetAuth0RoleId(dto.RoleId);
            List<string> roles = new List<string>();

            if (!string.IsNullOrEmpty(role))
                roles.Add(role);

            request.AddJsonBody(new { roles = roles });

            IRestResponse roleResponse = await client.ExecuteAsync(request);

            if (!roleResponse.IsSuccessful)
            {
                //TODO: Log here Assign Role Api Failed
            }

            return roleResponse.IsSuccessful;
        }

        private async Task<bool> RemoveRole(string userid, string auth0RoleId)
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);
            var request = new RestRequest($"/api/v2/users/{userid}/roles", Method.DELETE);

            request.AddHeader("Authorization", $"bearer {Auth0Token}");

            List<string> roles = new List<string>();

            if (!string.IsNullOrEmpty(auth0RoleId))
                roles.Add(auth0RoleId);

            request.AddJsonBody(new { roles = roles });

            IRestResponse roleResponse = await client.ExecuteAsync(request);

            if (!roleResponse.IsSuccessful)
            {
                //TODO: Log here Assign Role Api Failed
            }

            return roleResponse.IsSuccessful;
        }

        public async Task<bool> Update(long id, UserDTO dto)
        {
            //TODO: If Auth0Id is not passed from Front then need to fetch from DB
            var user = await GetAuth0UserId(id);

            string userid = user?.Auth0Id;

            if (!string.IsNullOrEmpty(userid))
            {
                var currentRole = user.Roles.FirstOrDefault();

                return await UpdateUser(dto, userid, currentRole?.RoleId, currentRole?.Role?.Auth0RoleId);
            }

            //TODO: We will allow to update in DB even user is not found in Auth0
            return true;
        }

        private async Task<bool> UpdateUser(UserDTO dto, string userid, int? currentRoleId = null, string currentRoleAuth0Id = "")
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);
            var request = new RestRequest($"/api/v2/users/{userid}", Method.PATCH);

            request.AddHeader("Authorization", $"bearer {Auth0Token}");

            var body = Mapper.Map<UpdateAuth0UserRequest>(dto);

            request.AddJsonBody(body);

            IRestResponse<Auth0UserResponse> response = await client.ExecuteAsync<Auth0UserResponse>(request);

            if (response.Data != null && response.IsSuccessful)
            {
                if (currentRoleId > 0 && currentRoleId != dto.RoleId)
                {
                    await RemoveRole(userid, currentRoleAuth0Id);
                    await AssignRole(userid, dto);
                }
            }

            return response.IsSuccessful;
        }

        public async Task<bool> Delete(long id)
        {
            var user = await GetAuth0UserId(id);

            string userid = user?.Auth0Id;

            if (!string.IsNullOrEmpty(userid))
            {
                RestClient client = new RestClient(_configuration["Auth0:Domain"]);
                var request = new RestRequest($"/api/v2/users/{userid}", Method.DELETE);

                request.AddHeader("Authorization", $"bearer {Auth0Token}");

                IRestResponse<Auth0UserResponse> response = await client.ExecuteAsync<Auth0UserResponse>(request);
            }

            return true;
        }

        public async Task<Auth0UserProfileResponse> GetAuth0UserProfile(string auth0Token)
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);

            var request = new RestRequest($"/userinfo", Method.GET);

            request.AddHeader("Authorization", $"bearer {auth0Token}");

            IRestResponse<Auth0UserProfileResponse> response = await client.ExecuteGetAsync<Auth0UserProfileResponse>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }

            return null;
        }

        public async Task<Auth0UserResponse> GetAuth0UserByEmail(string email)
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);

            var request = new RestRequest($"/api/v2/users-by-email", Method.GET);

            request.AddHeader("Authorization", $"bearer {Auth0Token}");
            request.AddParameter("email", email);

            IRestResponse<List<Auth0UserResponse>> response = await client.ExecuteGetAsync<List<Auth0UserResponse>>(request);

            if (response.IsSuccessful)
            {
                return response.Data.FirstOrDefault();
            }

            return null;
        }

        public async Task<List<Auth0Permission>> GetAuth0Permissions(int roleId)
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);
            string auth0RoleId = await GetAuth0RoleId(roleId);

            ///api/v2/roles/{id}/permissions
            var request = new RestRequest($"/api/v2/roles/{auth0RoleId}/permissions", Method.GET);

            request.AddHeader("Authorization", $"bearer {Auth0Token}");

            IRestResponse<List<Auth0Permission>> response = await client.ExecuteGetAsync<List<Auth0Permission>>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }

            return null;
        }

        private async Task<User> GetAuth0UserId(long id)
        {
            var user = await Context.Users.Include("Roles.Role").FirstOrDefaultAsync(t => t.Id == id);

            return user;
        }

        private async Task<string> GetAuth0RoleId(int id)
        {
            var role = await Context.Roles.FindAsync(id);

            if (role != null)
            {
                return role.Auth0RoleId;
            }

            return string.Empty;
        }

        private async Task<string> GetAuth0AccessToken()
        {
            RestClient client = new RestClient(_configuration["Auth0:Domain"]);

            var request = new RestRequest("/oauth/token", Method.POST);
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("grant_type", "client_credentials");
            request.AddParameter("client_id", _configuration["Auth0:ClientId"]);
            request.AddParameter("client_secret", _configuration["Auth0:ClientSecret"]);
            request.AddParameter("audience", _configuration["Auth0:Audience"]);

            IRestResponse<Auth0AccessTokenResponse> response = await client.ExecuteAsync<Auth0AccessTokenResponse>(request);

            return response.Data?.AccessToken ?? string.Empty;
        }
    }
}
