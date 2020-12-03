using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Constants;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services
{
    public class LoginService : Service<ILoginRepository>, ILoginService
    {
        IUserRepository _userRepository;
        IAuth0UserRepository _auth0Repository;
        IConfiguration _configuration;

        public LoginService(ILoginRepository repository, IUserRepository userRepository, IAuth0UserRepository auth0UserRepository, ITokenDTO token, IMapper mapper, ILogger<LoginService> logger, IStringLocalizer<Resource> localizer, IConfiguration configuration) : base(repository, token, mapper, logger, localizer)
        {
            _userRepository = userRepository;
            _auth0Repository = auth0UserRepository;
            _configuration = configuration;
        }

        public async Task<ResponseDTO<AuthenticateResponseDTO>> Authenticate(AuthenticateDTO dto, DeviceDetailDTO deviceDetail)
        {
            Guid sessionId = Guid.Empty;
            Auth0UserProfileResponse userProfile = null;

            if (dto.GrantType == GrantType.AUTH0_TOKEN)
                userProfile = await _auth0Repository.GetAuth0UserProfile(dto.Auth0Token);

            if (dto.GrantType == GrantType.REFRESH_TOKEN || (userProfile != null && userProfile.Sub.Equals(dto.Auth0Id, StringComparison.CurrentCultureIgnoreCase) && userProfile.Email.Equals(dto.Email, StringComparison.CurrentCultureIgnoreCase)))
            {
                var user = await _userRepository.GetUserByAuth0Id(dto.Auth0Id);

                if (user != null)
                {
                    if (dto.GrantType == GrantType.REFRESH_TOKEN)
                    {
                        Guid tokenId = Guid.Empty;
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var accessToken = tokenHandler.ReadJwtToken(dto.AccessToken);

                        sessionId = Guid.Parse(accessToken.Claims.FirstOrDefault(x => x.Type == "SessionId").Value);
                        tokenId = Guid.Parse(accessToken.Claims.FirstOrDefault(x => x.Type == "TokenId").Value);

                        var isValid = await Repository.ValidateRefreshToken((Guid)dto.RefreshToken, sessionId, tokenId);

                        if (isValid)
                        {
                            return await GetAccessToken(user, sessionId, deviceDetail);
                        }
                        else
                        {
                            return new ResponseDTO<AuthenticateResponseDTO>()
                            {
                                ResponseType = Shared.Enums.ResponseType.ERROR,
                                Message = Localizer[Messages.RefreshTokenInvalid]
                            };
                        }
                    }
                    else
                    {
                        //Sync User Info From Auth0 to Db
                        if (userProfile != null)
                        {
                            user.PictureUrl = userProfile.Picture;
                            user.FirstName = userProfile.GivenName;
                            user.LastName = userProfile.FamilyName;

                            await _userRepository.Update(user.Id, user);
                        }

                        sessionId = Guid.NewGuid();

                        //Save Session into Db
                        await Repository.SaveUserSession(new UserSession()
                        {
                            Id = sessionId,
                            BusinessUnitId = user.BusinessUnitId,
                            RoleId = user.RoleId,
                            LoginDate = DateTime.UtcNow,
                            UserId = user.Id
                        });

                        return await GetAccessToken(user, sessionId, deviceDetail);
                    }
                }
            }

            return new ResponseDTO<AuthenticateResponseDTO>()
            {
                ResponseType = Shared.Enums.ResponseType.ERROR,
                Message = Localizer[Messages.UserNotFound]
            };
        }

        private async Task<ResponseDTO<AuthenticateResponseDTO>> GetAccessToken(UserResponseDTO user, Guid sessionId, DeviceDetailDTO deviceDetail)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            Dictionary<string, object> claims = new Dictionary<string, object>();

            var tokenId = Guid.NewGuid();
            var refreshToken = Guid.NewGuid();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var expires = DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["Jwt:Timeout"]));

            var permissions = await _auth0Repository.GetAuth0Permissions(user.RoleId);

            //claims.Add("Permissions", string.Join("|", permissions.Select(t => t.PermissionName).Distinct()));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim("Id", user.Id.ToString()),
                        new Claim("Auth0Id", user.Auth0Id),
                        new Claim("BusinessUnitId", user.BusinessUnitId.ToString()),
                        new Claim("RoleId", user.RoleId.ToString()),
                        new Claim("ReportTo", user.ReportTo.HasValue ? user.ReportTo.ToString() : string.Empty),
                        new Claim("TokenId", tokenId.ToString()),
                        new Claim("SessionId", sessionId.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.MobilePhone, user.Phone),
                        new Claim("FirstName", user.FirstName),
                        new Claim("LastName", user.LastName),
                        new Claim("Permissions", string.Join("|", permissions.Select(t => t.PermissionName).Distinct()))
                }),
                Expires = expires,
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                Claims = claims,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            // To Save Token Details Db
            await Repository.SaveUserDeviceToken(new UserTokenDetail()
            {
                IP = deviceDetail.IP,
                IssueOn = DateTime.UtcNow,
                ExpireOn = expires,
                DeviceDetails = deviceDetail.DeviceDetails,
                RefreshToken = refreshToken,
                DeviceType = deviceDetail.DeviceType,
                SessionId = sessionId,
                TokenId = tokenId
            });

            return new ResponseDTO<AuthenticateResponseDTO>()
            {
                Data = new AuthenticateResponseDTO()
                {
                    AccessToken = tokenHandler.WriteToken(token),
                    RefreshToken = refreshToken,
                    Permissions = permissions,
                    RoleName = user.RoleName,
                    //TokenId = tokenId,
                    UserId = user.Id,
                    Expires = expires
                },
                ResponseType = ResponseType.SUCCESS
            };
        }

        public async Task<ResponseDTO<bool>> Logout()
        {
            var result = await Repository.Logout(Token.SessionId);
            if (result)
            {
                return new ResponseDTO<bool>()
                {
                    Data = result,
                    ResponseType = ResponseType.SUCCESS,
                    Message = string.Empty
                };
            }
            else
            {
                return new ResponseDTO<bool>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.CommonError, MessageKeyArg]
                };
            }
        }
    }
}