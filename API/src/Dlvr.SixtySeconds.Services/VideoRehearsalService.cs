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

namespace Dlvr.SixtySeconds.Services
{
    public class VideoRehearsalService : CreateDeleteService<IVideoRehearsalRepository, PaggerRequestDTO, VideoRehearsalDTO, VideoRehearsalDTO>, IVideoRehearsalService
    {
        public VideoRehearsalService(IVideoRehearsalRepository repository, ITokenDTO token, IMapper mapper, ILogger<VideoRehearsalService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {
        }
    }
}
