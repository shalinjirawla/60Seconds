using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class TaskAssignmentFeedbackRepository : CreateDeleteRepository<TaskAssignmentFeedback, TaskAssignmentFeedbackPaggerRequestDTO, TaskAssignmentFeedbackDTO, TaskAssignmentFeedbackResponseDTO>, ITaskAssignmentFeedbackRepository
    {
        public TaskAssignmentFeedbackRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {
        }

        public override async Task<TaskAssignmentFeedbackResponseDTO> Get(long id)
        {
            var feedback = await Context.TaskAssignmentFeedbacks.Include(t => t.CreatedByUser).FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);

            return Mapper.Map<TaskAssignmentFeedbackResponseDTO>(feedback);
        }

        public override async Task<PaggerResponseDTO<TaskAssignmentFeedbackResponseDTO>> GetAll(TaskAssignmentFeedbackPaggerRequestDTO dto)
        {
            var lst = Context.TaskAssignmentFeedbacks.Where(t => t.DeletedOn == null && t.TaskAssignmentId == dto.TaskAssignmentId && (t.ScenarioId == dto.ScenarioId || t.ScriptId == dto.ScriptId || t.AudioRehearsalId == dto.AudioRehearsalId || t.VideoRehearsalId == dto.VideoRehearsalId) && (string.IsNullOrEmpty(dto.SearchKeyword) || t.Description.Contains(dto.SearchKeyword))).Include(t => t.CreatedByUser);

            return await GetPaggerResponseDTO(lst, dto, x => x.CreatedOn);
        }

        protected override long GetPrimaryKey(TaskAssignmentFeedback model)
        {
            return model?.Id ?? 0;
        }
    }
}
