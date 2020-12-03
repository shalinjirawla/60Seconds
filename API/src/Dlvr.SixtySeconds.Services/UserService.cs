using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Services.Base;
using Dlvr.SixtySeconds.Services.Contracts;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Dlvr.SixtySeconds.Resources.Localize;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dlvr.SixtySeconds.Shared.Enums;
using Dlvr.SixtySeconds.Shared.Constants;

namespace Dlvr.SixtySeconds.Services
{
    public class UserService : CreateUpdateDeleteService<IUserRepository, PaggerRequestDTO, UserDTO, UserResponseDTO>, IUserService
    {
        IAuth0UserRepository _auth0UserRepository;

        public UserService(IUserRepository repository, IAuth0UserRepository auth0UserRepository, ITokenDTO token, IMapper mapper, ILogger<UserService> logger, IStringLocalizer<Resource> localizer) : base(repository, token, mapper, logger, localizer)
        {
            _auth0UserRepository = auth0UserRepository;
            MessageKeyArg = "User";
        }

        public override async Task<ResponseDTO<long>> Create(UserDTO dto)
        {
            if (!await Repository.ValidateEmailExists(0, dto))
                return await base.Create(dto);

            return new ResponseDTO<long>()
            {
                ResponseType = ResponseType.ERROR,
                Message = Localizer[Messages.DuplicateError, dto.Email]
            };
        }


        public override async Task<ResponseDTO<bool>> Delete(long id)
        {
            //TODO:Can't Delete Super Admin
            if (id > 1)
            {
                return await base.Delete(id);
            }

            return new ResponseDTO<bool>()
            {
                ResponseType = ResponseType.ERROR,
                Message = Localizer[Messages.DeleteSuccess, MessageKeyArg]
            };
        }

        public override async Task<ResponseDTO<bool>> Update(long id, UserDTO dto)
        {
            if (!await Repository.ValidateEmailExists(id, dto))
                return await base.Update(id, dto);

            return new ResponseDTO<bool>()
            {
                ResponseType = ResponseType.ERROR,
                Message = Localizer[Messages.DuplicateError, dto.Email]
            };
        }


        protected override async Task<bool> BeforeCreate(UserDTO dto)
        {
            var auth0Id = await _auth0UserRepository.Create(dto);

            if (!string.IsNullOrEmpty(auth0Id))
            {
                dto.Auth0Id = auth0Id;

                return await base.BeforeCreate(dto);
            }

            return await System.Threading.Tasks.Task.FromResult(false);
        }

        protected override async Task<bool> BeforeDelete(long id)
        {
            var result = await _auth0UserRepository.Delete(id);

            if (result)
                return await base.BeforeDelete(id);

            return await System.Threading.Tasks.Task.FromResult(false);
        }

        protected override async Task<bool> BeforeUpdate(long id, UserDTO dto)
        {
            var result = await _auth0UserRepository.Update(id, dto);

            if (result)
                return await base.BeforeUpdate(id, dto);

            return await System.Threading.Tasks.Task.FromResult(false);
        }

        //getting get receipt list for create new task screen//
        public async Task<ResponseDTO<List<UserResponseDTO>>> GetRecipientsList()
        {
            //getting get receipt list for create new task screen//
            var result = await Repository.GetRecipientsList();
            if (result != null)
            {
                return new ResponseDTO<List<UserResponseDTO>>()
                {
                    Data = result,
                    ResponseType = ResponseType.SUCCESS,
                    Message = string.Empty
                };
            }
            else
            {
                return new ResponseDTO<List<UserResponseDTO>>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.CommonError, MessageKeyArg]
                };
            }
        }


        //getting users ReportTo//
        public async Task<ResponseDTO<List<UserResponseDTO>>> GetReportToUsers()
        {
            //getting users ReportTo//
            var result = await Repository.GetReportToUsers();
            if (result != null)
            {
                return new ResponseDTO<List<UserResponseDTO>>()
                {
                    Data = result,
                    ResponseType = ResponseType.SUCCESS,
                    Message = string.Empty
                };
            }
            else
            {
                return new ResponseDTO<List<UserResponseDTO>>()
                {
                    ResponseType = ResponseType.ERROR,
                    Message = Localizer[Messages.CommonError, MessageKeyArg]
                };
            }
        }

        public async Task<PaggerResponseDTO<TeamMemberDTO>> GetTeamMembers(PaggerRequestDTO dto)
        {
            try
            {
                return await Repository.GetTeamMembers(dto);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}
