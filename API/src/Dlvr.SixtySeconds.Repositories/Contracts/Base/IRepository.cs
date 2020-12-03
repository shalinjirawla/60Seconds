using Dlvr.SixtySeconds.DomainObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Contracts.Base
{
    public interface IRepository : IDisposable
    {

    }

    public interface IRepository<TPaggerDTO, TResponseDTO> : IRepository
        where TPaggerDTO : PaggerRequestDTO
    {
        Task<PaggerResponseDTO<TResponseDTO>> GetAll(TPaggerDTO dto);
    }

    public interface ICreateRepository<TPaggerDTO, TRequestDTO, TResponseDTO> : IRepository<TPaggerDTO, TResponseDTO>
        where TPaggerDTO : PaggerRequestDTO
    {
        Task<TResponseDTO> Get(long id);
        Task<long> Create(TRequestDTO dto);
    }

    public interface ICreateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO> : ICreateRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
        where TPaggerDTO : PaggerRequestDTO
    {
        Task<bool> Delete(long id);
    }

    public interface ICreateUpdateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO> : ICreateDeleteRepository<TPaggerDTO, TRequestDTO, TResponseDTO>
        where TPaggerDTO : PaggerRequestDTO
    {
        Task<bool> Update(long id, TRequestDTO dto);
    }
}
