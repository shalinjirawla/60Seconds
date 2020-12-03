using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Shared.Enums;
using Dlvr.SixtySeconds.Shared.Constants;

namespace Dlvr.SixtySeconds.Services
{
    public class GalleryService : Service<IGalleryRepository, PaggerRequestDTO, GalleryPitchDTO>, IGalleryService
    {
        #region "Init constructor with TaskRepository"
        public GalleryService(IGalleryRepository repository, ITokenDTO token, IMapper mapper, ILogger<UserService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {
        }
        #endregion

        #region "Main methods"
        public Task<GalleryPitchDTO> GalleryPitch(long assignmentId)
        {
            try
            {
                return Repository.GalleryPitch(assignmentId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<ResponseDTO<bool>> LikeUnlikeTaskAssignment(long taskAssignmentId, bool isLiked)
        {
            var result = await Repository.LikeUnlikeTaskAssignment(taskAssignmentId, isLiked);
            if (result == 1)
            {
                return new ResponseDTO<bool>()
                {
                    Data = true,
                    ResponseType = ResponseType.SUCCESS,
                    Message = string.Empty
                };
            }
            else if (result == 2)
            {
                return new ResponseDTO<bool>()
                {
                    Data = false,
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.CanNotLikePitch,MessageKeyArg]
                };
            }
            else
            {
                return new ResponseDTO<bool>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.CommonError, MessageKeyArg]
                };
            }
        }

        public async Task<ResponseDTO<bool>> ShareTaskAssignment(long taskAssignmentId, List<long> userList)
        {
            var result = await Repository.ShareTaskAssignment(taskAssignmentId, userList);
            if (result)
            {
                return new ResponseDTO<bool>()
                {
                    Data = result,
                    ResponseType = ResponseType.SUCCESS,
                    Message = string.Empty
                };
            }
            else
            {
                return new ResponseDTO<bool>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.CommonError, MessageKeyArg]
                };
            }
        }
        #endregion

    }
}
