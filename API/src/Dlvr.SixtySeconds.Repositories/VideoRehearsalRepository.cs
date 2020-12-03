using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Repositories
{
    public class VideoRehearsalRepository : CreateDeleteRepository<VideoRehearsal, PaggerRequestDTO, VideoRehearsalDTO, VideoRehearsalDTO>, IVideoRehearsalRepository
    {
        public VideoRehearsalRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {
        }

        public async override Task<VideoRehearsalDTO> Get(long id)
        {
            var video = await Context.VideoRehearsals.FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);
            return Mapper.Map<VideoRehearsalDTO>(video);
        }

        public override Task<PaggerResponseDTO<VideoRehearsalDTO>> GetAll(PaggerRequestDTO dto)
        {
            throw new NotImplementedException();
        }

        protected override long GetPrimaryKey(VideoRehearsal model)
        {
            return model?.Id ?? 0;
        }
    }
}
