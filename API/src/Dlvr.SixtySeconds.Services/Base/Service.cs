using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Shared.Constants;

namespace Dlvr.SixtySeconds.Services.Base
{
    public class Service<TRepo> : IService
        where TRepo : IRepository
    {
        protected TRepo Repository;
        protected IMapper Mapper;
        protected ILogger Logger;
        protected IStringLocalizer<Resource> Localizer;
        protected ITokenDTO Token;
        protected string MessageKeyArg = string.Empty;

        public Service(TRepo repository, ITokenDTO token, IMapper mapper, ILogger logger, IStringLocalizer<Resource> localizer)
        {
            Repository = repository;
            Token = token;
            Mapper = mapper;
            Logger = logger;
            Localizer = localizer;
        }

        public virtual void Dispose()
        {

        }
    }

    public class Service<TRepo, TPaggerDTO, TResponseDTO> : Service<TRepo>, IService<TPaggerDTO, TResponseDTO>
        where TRepo : IRepository<TPaggerDTO, TResponseDTO>
        where TPaggerDTO : PaggerRequestDTO
        where TResponseDTO : new()
    {
        public Service(TRepo repository, ITokenDTO token, IMapper mapper, ILogger logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {

        }

        public async Task<ResponseDTO<PaggerResponseDTO<TResponseDTO>>> GetAll(TPaggerDTO dto)
        {
            var lst = await Repository.GetAll(dto);

            return new ResponseDTO<PaggerResponseDTO<TResponseDTO>>()
            {
                Data = lst,
                ResponseType = ResponseType.SUCCESS
            };
        }

        public override void Dispose()
        {
            base.Dispose();
            Repository?.Dispose();
        }
    }

    public abstract class CreateService<TRepo, TPaggerDTO, TRequestDTO, TResponseDTO> : Service<TRepo, TPaggerDTO, TResponseDTO>, ICreateService<TPaggerDTO, TRequestDTO, TResponseDTO>
       where TRepo : ICreateRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
       where TPaggerDTO : PaggerRequestDTO
       where TResponseDTO : new()
       where TRequestDTO : new()

    {
        public CreateService(TRepo repository, ITokenDTO token, IMapper mapper, ILogger logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {

        }


        public async Task<ResponseDTO<TResponseDTO>> Get(long id)
        {
            var result = await Repository.Get(id);

            return new ResponseDTO<TResponseDTO>()
            {
                Data = result,
                ResponseType = ResponseType.SUCCESS
            };
        }


        public virtual async Task<ResponseDTO<long>> Create(TRequestDTO dto)
        {
            if (await BeforeCreate(dto))
            {
                long result = await Repository.Create(dto);

                if (result > 0)
                {
                    await AfterCreate(dto, result);

                    return new ResponseDTO<long>()
                    {
                        Data = result,
                        ResponseType = ResponseType.SUCCESS,
                        Message = Localizer[Messages.CreateSuccess, MessageKeyArg]
                    };
                }
            }


            return new ResponseDTO<long>()
            {
                ResponseType = ResponseType.ERROR,
                Message = Localizer[Messages.CreateError, MessageKeyArg]
            };
        }

        protected virtual async Task<bool> BeforeCreate(TRequestDTO dto)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected virtual async Task<bool> AfterCreate(TRequestDTO dto, long response)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }
    }

    public abstract class CreateDeleteService<TRepo, TPaggerDTO, TRequestDTO, TResponseDTO> : CreateService<TRepo, TPaggerDTO, TRequestDTO, TResponseDTO>, ICreateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO>
        where TRepo : ICreateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
        where TPaggerDTO : PaggerRequestDTO
        where TResponseDTO : new()
        where TRequestDTO : new()
    {
        public CreateDeleteService(TRepo repository, ITokenDTO token, IMapper mapper, ILogger logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {

        }


        public virtual async Task<ResponseDTO<bool>> Delete(long id)
        {
            bool result = false;

            if (await BeforeDelete(id))
            {
                result = await Repository.Delete(id);

                if (result)
                {
                    await AfterDelete(id);
                }
            }

            return new ResponseDTO<bool>()
            {
                Data = result,
                ResponseType = result ? ResponseType.SUCCESS : ResponseType.ERROR,
                Message = Localizer[result ? Messages.DeleteSuccess : Messages.DeleteError, MessageKeyArg]
            };
        }

        protected virtual async Task<bool> BeforeDelete(long id)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected virtual async Task<bool> AfterDelete(long id)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }
    }

    public abstract class CreateUpdateDeleteService<TRepo, TPaggerDTO, TRequestDTO, TResponseDTO> : CreateDeleteService<TRepo, TPaggerDTO, TRequestDTO, TResponseDTO>, ICreateUpdateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO>
      where TRepo : ICreateUpdateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
      where TPaggerDTO : PaggerRequestDTO
      where TResponseDTO : new()
      where TRequestDTO : new()
    {
        public CreateUpdateDeleteService(TRepo repository, ITokenDTO token, IMapper mapper, ILogger logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {

        }


        public virtual async Task<ResponseDTO<bool>> Update(long id, TRequestDTO dto)
        {
            if (await BeforeUpdate(id, dto))
            {
                bool result = await Repository.Update(id, dto);

                if (result)
                {
                    await AfterUpdate(id, dto, result);

                    return new ResponseDTO<bool>()
                    {
                        Data = result,
                        ResponseType = ResponseType.SUCCESS,
                        Message = Localizer[Messages.UpdateSuccess, MessageKeyArg]
                    };
                }
            }

            return new ResponseDTO<bool>()
            {
                ResponseType = ResponseType.ERROR,
                Message = Localizer[Messages.UpdateError, MessageKeyArg]
            };
        }

        protected virtual async Task<bool> BeforeUpdate(long id, TRequestDTO dto)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected virtual async Task<bool> AfterUpdate(long id, TRequestDTO dto, bool response)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }
    }
}
