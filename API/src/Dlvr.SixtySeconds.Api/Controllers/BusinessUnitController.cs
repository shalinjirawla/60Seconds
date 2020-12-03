using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Api.Controllers.Base;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Dlvr.SixtySeconds.Shared.Constants.Scope;

namespace Dlvr.SixtySeconds.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessUnitController : CreateUpdateDeleteController<IBusinessUnitService, PaggerRequestDTO, BusinessUnitDTO, BusinessUnitDTO>
    {
        public BusinessUnitController(IBusinessUnitService service, ILogger<BusinessUnitController> logger) : base(service, logger)
        {
        }

        [Authorize(BusinessUnit.AllRead)]
        public override Task<IActionResult> Get([FromQuery] PaggerRequestDTO request)
        {
            return base.Get(request);
        }

        [Authorize(BusinessUnit.Read)]
        public override async Task<IActionResult> Get(int id)
        {
            return await base.Get(id);
        }

        [Authorize(BusinessUnit.Create)]
        public override async Task<IActionResult> Post([FromBody] BusinessUnitDTO request)
        {
            return await base.Post(request);
        }

        [Authorize(BusinessUnit.Update)]
        public override async Task<IActionResult> Put(int id, [FromBody] BusinessUnitDTO request)
        {
            return await base.Put(id, request);
        }

        [Authorize(BusinessUnit.Delete)]
        public override async Task<IActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }

        [Authorize(BusinessUnit.ScriptfieldsRead)]
        [HttpGet]
        [Route("{id:long}/scriptfields")]
        public async Task<IActionResult> GetScriptFields(long id)
        {
            try
            {
                var scriptFieldsResponse = await Service.Get(id); ;

                if (scriptFieldsResponse.ResponseType == ResponseType.SUCCESS)
                {
                    return Ok(new ResponseDTO<IList<ScriptFieldDTO>>()
                    {
                        Data = scriptFieldsResponse.Data?.ScriptFieldCollection,
                        ResponseType = ResponseType.SUCCESS
                    });
                }
                else
                {
                    return Ok(scriptFieldsResponse);
                }
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [Authorize(BusinessUnit.ReadKeywords)]
        [HttpGet]
        [Route("keywords")]
        public async Task<IActionResult> GetKeywords([FromQuery]PaggerRequestDTO request)
        {
            try
            {                
                return Ok(await Service.GetKeywords(request));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }
    }
}