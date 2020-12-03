using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Services
{
    public class TaskAssignmentFeedbackService : CreateDeleteService<ITaskAssignmentFeedbackRepository, TaskAssignmentFeedbackPaggerRequestDTO, TaskAssignmentFeedbackDTO, TaskAssignmentFeedbackResponseDTO>, ITaskAssignmentFeedbackService
    {
        public TaskAssignmentFeedbackService(ITaskAssignmentFeedbackRepository repository, ITokenDTO token, IMapper mapper, ILogger<TaskAssignmentFeedbackService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {
        }
    }
}
