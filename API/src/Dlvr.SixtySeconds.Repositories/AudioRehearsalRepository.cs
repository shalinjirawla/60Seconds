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
    public class AudioRehearsalRepository : CreateDeleteRepository<AudioRehearsal, PaggerRequestDTO, AudioRehearsalDTO, AudioRehearsalDTO>, IAudioRehearsalRepository
    {
        public AudioRehearsalRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper) : base(context, token, mapper)
        {
        }

        public async override Task<AudioRehearsalDTO> Get(long id)
        {
            var audio = await Context.AudioRehearsals.FirstOrDefaultAsync(t => t.Id.Equals(id) && t.DeletedOn == null);
            return Mapper.Map<AudioRehearsalDTO>(audio);
        }

        public override Task<PaggerResponseDTO<AudioRehearsalDTO>> GetAll(PaggerRequestDTO dto)
        {
            throw new NotImplementedException();
        }

        protected override long GetPrimaryKey(AudioRehearsal model)
        {
            return model?.Id ?? 0;
        }
    }
}
