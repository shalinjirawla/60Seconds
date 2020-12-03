using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Base
{
    public abstract class Repository : IRepository
    {
        protected SixtySecondsDbContext Context;
        protected ITokenDTO Token;
        protected IMapper Mapper;

        public Repository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper)
        {
            Context = context;
            Token = token;
            Mapper = mapper;
        }

        public virtual void Dispose()
        {

        }
    }

    public abstract class Repository<T, TPaggerDTO, TResponseDTO> : Repository, IRepository<TPaggerDTO, TResponseDTO>
        where T : new()
        where TPaggerDTO : PaggerRequestDTO
    {
        public Repository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {

        }

        public abstract Task<PaggerResponseDTO<TResponseDTO>> GetAll(TPaggerDTO dto);

        protected async Task<PaggerResponseDTO<TResponseDTO>> GetPaggerResponseDTO(IIncludableQueryable<T, object> lst, TPaggerDTO dto, Expression<Func<T, object>> sortExpression)
        {
            return await GetPaggerResponseDTO<T, TResponseDTO>(lst, dto, sortExpression);
        }

        protected async Task<PaggerResponseDTO<TResponseDTO>> GetPaggerResponseDTO(IQueryable<T> lst, TPaggerDTO dto, Expression<Func<T, object>> sortExpression)
        {
            return await GetPaggerResponseDTO<T, TResponseDTO>(lst, dto, sortExpression);
        }

        protected async Task<PaggerResponseDTO<TResponseDTO>> GetPaggerResponseDTO(IQueryable<TResponseDTO> lst, TPaggerDTO dto, Expression<Func<TResponseDTO, object>> sortExpression)
        {
            return await GetPaggerResponseDTO<TResponseDTO, TResponseDTO>(lst, dto, sortExpression);
        }

        protected async Task<PaggerResponseDTO<TDTO>> GetPaggerResponseDTO<TDTO>(IQueryable<TDTO> lst, TPaggerDTO dto, Expression<Func<TDTO, object>> sortExpression)
        {
            var response = new PaggerResponseDTO<TDTO>()
            {
                TotalRecords = await lst.CountAsync(),
                PageIndex = dto.PageIndex
            };

            if (dto.Direction == SortDirection.ASC)
                response.Records = await lst.OrderBy(sortExpression).Skip((dto.PageIndex - 1) * dto.PageSize).Take(dto.PageSize).ToListAsync();
            else
                response.Records = await lst.OrderByDescending(sortExpression).Skip((dto.PageIndex - 1) * dto.PageSize).Take(dto.PageSize).ToListAsync();

            return response;
        }

        protected async Task<PaggerResponseDTO<TResult>> GetPaggerResponseDTO<TReq, TResult>(IQueryable<TReq> lst, TPaggerDTO dto, Expression<Func<TReq, object>> sortExpression)
        {
            var pagger = await GetPaggerResponseDTO(lst, dto, sortExpression);

            var response = new PaggerResponseDTO<TResult>()
            {
                TotalRecords = pagger.TotalRecords,
                PageIndex = pagger.PageIndex,
                Records = pagger.Records.Select(t=> Mapper.Map<TResult>(t)).ToList()
            };

            return response;
        }

        public override void Dispose()
        {
            base.Dispose();
            Context.DisposeAsync();
        }
    }

    public abstract class CreateRepository<T, TPaggerDTO, TRequestDTO, TResponseDTO> : Repository<T, TPaggerDTO, TResponseDTO>, ICreateRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
        where T : CreatedByBaseModel, new()
        where TPaggerDTO : PaggerRequestDTO
        where TResponseDTO : new()
    {
        public CreateRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {

        }

        public abstract Task<TResponseDTO> Get(long id);

        public virtual async Task<long> Create(TRequestDTO dto)
        {
            var model = Mapper.Map<T>(dto);

            if (model != null && await BeforeCreate(dto, model))
            {
                model.CreatedBy = Token.Id;
                model.CreatedOn = DateTime.UtcNow;

                await Context.AddAsync<T>(model);
                await Context.SaveChangesAsync();

                await AfterCreate(dto, model);

                return GetPrimaryKey(model);
            }

            return 0L;
        }

        protected virtual async Task<bool> BeforeCreate(TRequestDTO dto, T model)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected virtual async Task<bool> AfterCreate(TRequestDTO dto, T model)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected abstract long GetPrimaryKey(T model);
    }

    public abstract class CreateDeleteRepository<T, TPaggerDTO, TRequestDTO, TResponseDTO> : CreateRepository<T, TPaggerDTO, TRequestDTO, TResponseDTO>, ICreateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
        where T : CreatedDeletedByBaseModel, new()
        where TPaggerDTO : PaggerRequestDTO
        where TResponseDTO : new()
    {
        public CreateDeleteRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {

        }

        public virtual async Task<bool> Delete(long id)
        {
            var model = await Context.FindAsync<T>(id);

            if (model != null && await BeforeDelete(id, model))
            {
                model.DeletedBy = Token.Id;
                model.DeletedOn = DateTime.UtcNow;
                await Context.SaveChangesAsync();

                await AfterDelete(id, model);

                return await System.Threading.Tasks.Task.FromResult(true); ;
            }

            return false;
        }

        protected virtual async Task<bool> BeforeDelete(long id, T model)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected virtual async Task<bool> AfterDelete(long id, T model)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }
    }

    public abstract class CreateUpdateDeleteRepository<T, TPaggerDTO, TRequestDTO, TResponseDTO> : CreateDeleteRepository<T, TPaggerDTO, TRequestDTO, TResponseDTO>, ICreateUpdateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
        where T : CreatedUpdatedDeletedByBaseModel, new()
        where TPaggerDTO : PaggerRequestDTO
        where TResponseDTO : new()
    {
        public CreateUpdateDeleteRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {

        }

        public virtual async Task<bool> Update(long id, TRequestDTO dto)
        {
            if (id > 0)
            {
                var entity = await FindAsync(id, dto);

                if (entity != null && await BeforeUpdate(id, dto, entity))
                {
                    var model = Mapper.Map<T>(dto);

                    UpdateProperties(entity, model, dto);

                    entity.UpdatedBy = Token.Id;
                    entity.UpdatedOn = DateTime.UtcNow;

                    await Context.SaveChangesAsync();

                    await AfterUpdate(id, dto, model);

                    return await System.Threading.Tasks.Task.FromResult(true);
                }
            }

            return await System.Threading.Tasks.Task.FromResult(false);
        }

        protected virtual async Task<T> FindAsync(long id, TRequestDTO dto)
        {
            return await Context.FindAsync<T>(id);
        }

        protected abstract void UpdateProperties(T dest, T source, TRequestDTO DTO);

        protected virtual async Task<bool> BeforeUpdate(long id, TRequestDTO dto, T model)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }

        protected virtual async Task<bool> AfterUpdate(long id, TRequestDTO dto, T model)
        {
            return await System.Threading.Tasks.Task.FromResult(true);
        }
    }
}
