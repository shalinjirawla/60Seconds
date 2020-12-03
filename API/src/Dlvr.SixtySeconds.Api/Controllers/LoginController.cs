using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Ocsp;
using System;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : BaseController<ILoginService>
    {
        public LoginController(ILoginService service, ILogger<LoginController> logger) : base(service, logger)
        {

        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateDTO request)
        {
            try
            {
                if ((request.GrantType == GrantType.AUTH0_TOKEN && !string.IsNullOrWhiteSpace(request.Auth0Token)) || (request.GrantType == GrantType.REFRESH_TOKEN && !string.IsNullOrWhiteSpace(request.AccessToken) && request.RefreshToken.HasValue))
                {
                    var deviceType = Request.Headers["X-DeviceType"].ToString();
                    var device = Request.Headers["X-Device"].ToString();

                    DeviceType deviceTypeResponse = !string.IsNullOrEmpty(deviceType) ? (DeviceType)Enum.Parse(typeof(DeviceType), deviceType) : DeviceType.Web;

                    DeviceDetailDTO deviceDetail = new DeviceDetailDTO()
                    {
                        IP = HttpContext.Connection.RemoteIpAddress.ToString(),
                        DeviceDetails = device,
                        DeviceType = deviceTypeResponse
                    };

                    return Ok(await Service.Authenticate(request, deviceDetail));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [HttpPut]
        [Route("/api/Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                return Ok(await Service.Logout());
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }
    }
}