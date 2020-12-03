using Dlvr.SixtySeconds.DomainObjects;
using System;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts.Base
{
    public interface IService : IDisposable
    {
    }

    public interface IService<TPaggerDTO, TResponseDTO> : IService
    {
        Task<ResponseDTO<PaggerResponseDTO<TResponseDTO>>> GetAll(TPaggerDTO dto);
    }

    public interface ICreateService<TPaggerDTO, TRequestDTO, TResponseDTO> : IService<TPaggerDTO, TResponseDTO>
    {
        Task<ResponseDTO<TResponseDTO>> Get(long id);
        Task<ResponseDTO<long>> Create(TRequestDTO dto);
    }

    public interface ICreateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO> : ICreateService<TPaggerDTO, TRequestDTO, TResponseDTO>
    {
        Task<ResponseDTO<bool>> Delete(long id);
    }

    public interface ICreateUpdateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO> : ICreateDeleteService<TPaggerDTO, TRequestDTO, TResponseDTO>
    {
        Task<ResponseDTO<bool>> Update(long id, TRequestDTO dto);
    }
}
