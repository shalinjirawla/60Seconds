using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Api.Controllers.Base
{
    public class BaseController<TService> : ControllerBase
    {
        protected TService Service;
        protected ILogger Logger;
        public BaseController(TService service, ILogger logger)
        {
            Service = service;
            Logger = logger;
        }

        protected IActionResult CatchError(Exception ex)
        {
            Logger.LogError(ex, ex.Message);
            return StatusCode(500);
        }
    }

    public class BaseController<TService, TPaggerDTO, TResponseDTO> : BaseController<TService>
        where TService : IService<TPaggerDTO, TResponseDTO>
    {
        public BaseController(TService service, ILogger logger) : base(service, logger)
        {

        }

        [HttpGet]
        public virtual async Task<IActionResult> Get([FromQuery]TPaggerDTO request)
        {
            try
            {
                return Ok(await Service.GetAll(request));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }
    }

    public class CreateController<TService, TPaggerDTO, TRequestDTO, TResponseDTO> : BaseController<TService, TPaggerDTO, TResponseDTO>
        where TService : ICreateService<TPaggerDTO, TRequestDTO, TResponseDTO>
    {
        public CreateController(TService service, ILogger logger) : base(service, logger)
        {

        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await Service.Get(id));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] TRequestDTO request)
        {
            try
            {
                if (!ModelState.IsValid) 
                {
                    return BadRequest();
                }

                return Ok(await Service.Create(request));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

    }

    public class CreateDeleteController<TService, TPaggerDTO, TRequestDTO, TResponseDTO> : CreateController<TService, TPaggerDTO, TRequestDTO, TResponseDTO>
        where TService : ICreateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO>
    {
        public CreateDeleteController(TService service, ILogger logger) : base(service, logger)
        {

        }


        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            try
            {
                return Ok(await Service.Delete(id));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }
    }

    public class CreateUpdateDeleteController<TService, TPaggerDTO, TRequestDTO, TResponseDTO> : CreateDeleteController<TService, TPaggerDTO, TRequestDTO, TResponseDTO>
        where TService : ICreateUpdateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO>
    {
        public CreateUpdateDeleteController(TService service, ILogger logger) : base(service, logger)
        {

        }


        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put(int id, [FromBody] TRequestDTO request)
        {
            try
            {
                return Ok(await Service.Update(id, request));
            }
            catch (Exception ex)
            {
                return CatchError(ex);
            }
        }

    }
}
