using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface IGalleryService : IService<PaggerRequestDTO, GalleryPitchDTO>
    {
        Task<GalleryPitchDTO> GalleryPitch(long assignmentId);
        Task<ResponseDTO<bool>> LikeUnlikeTaskAssignment(long taskAssignmentId, bool isLiked);
        Task<ResponseDTO<bool>> ShareTaskAssignment(long taskAssignmentId, List<long> userList);
    }
}
