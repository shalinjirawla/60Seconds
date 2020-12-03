﻿using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Services.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.Services.Contracts
{
    public interface ITaskAssignmentCommentService : ICreateDeleteService<TaskAssignmentCommentPaggerRequestDTO, TaskAssignmentCommentDTO, TaskAssignmentCommentResponseDTO>
    {
    }
}
