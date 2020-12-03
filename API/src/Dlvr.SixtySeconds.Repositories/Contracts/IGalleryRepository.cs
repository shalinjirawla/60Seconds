using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface IGalleryRepository : IRepository<PaggerRequestDTO, GalleryPitchDTO>
    {
        Task<GalleryPitchDTO> GalleryPitch(long assignmentId);
        Task<int> LikeUnlikeTaskAssignment(long taskAssignmentId, bool isLiked);
        Task<bool> ShareTaskAssignment(long taskAssignmentId, List<long> userList);
    }
}
