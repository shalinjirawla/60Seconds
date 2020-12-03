using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Shared.Constants;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Localization;
using Dlvr.SixtySeconds.DomainObjects.Localization;
using static Dlvr.SixtySeconds.Shared.Constants.Scope;
using Microsoft.AspNetCore.Authorization;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CreateUpdateDeleteController<IUserService, PaggerRequestDTO, UserDTO, UserResponseDTO>
    {
        public UserController(IUserService service, ILogger<UserController> logger, IStringLocalizer<Resource> localizer) : base(service, logger)
        {
        }

        [Authorize(Scope.User.AllRead)]
        public override async Task<IActionResult> Get([FromQuery]PaggerRequestDTO request)
        {
            return await base.Get(request);
        }

        [Authorize(Scope.User.Create)]
        public override async Task<IActionResult> Post([FromBody] UserDTO request)
        {
            return await base.Post(request);
        }

        [Authorize(Scope.User.Update)]
        public override async Task<IActionResult> Put(int id, [FromBody] UserDTO request)
        {
            return await base.Put(id,request);
        }

        [Authorize(Scope.User.Delete)]
        public override async Task<IActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }

        [Authorize(Scope.User.Read)]
        public override async Task<IActionResult> Get(int id)
        {
            return await base.Get(id);
        }

        [HttpGet]
        [Route("GetRecipients")]
        public async Task<IActionResult> GetRecipientsList()
        {
            try
            {
                return Ok(await Service.GetRecipientsList());
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [HttpGet]
        [Route("GetReportToUsers")]
        public async Task<IActionResult> GetReportToUsers()
        {
            try
            {
                return Ok(await Service.GetReportToUsers());
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [HttpGet]
        [Route("GetTeamMembers")]
        public async Task<IActionResult> GetTeamMembers([FromQuery]PaggerRequestDTO dto)
        {
            return Ok(await Service.GetTeamMembers(dto));
        }

        #region Allowing users to select a culture
        //[HttpPost]
        //[Route("SetLanguage")]
        //public IActionResult SetLanguage([FromBody] LanguageDTO input)
        //{
        //    try
        //    {
        //        Response.Cookies.Append(
        //        CookieRequestCultureProvider.DefaultCookieName,
        //        CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(input.Culture)),
        //        new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
        //    );
        //        return Ok(true);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        #endregion
    }
}
