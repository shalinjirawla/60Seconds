﻿using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Repositories.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.Repositories.Contracts
{
    public interface IVideoRehearsalRepository : ICreateDeleteRepository<PaggerRequestDTO, VideoRehearsalDTO, VideoRehearsalDTO>
    {
    }
}
