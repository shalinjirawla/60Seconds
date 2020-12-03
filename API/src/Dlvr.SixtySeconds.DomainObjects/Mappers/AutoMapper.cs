using AutoMapper;
using Dlvr.SixtySeconds.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects.Mappers
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<UserDTO, User>().ReverseMap();

            CreateMap<UserDTO, Auth0User>()
                //.ForMember(dest => dest.phone_number, opt => opt.MapFrom(src => src.Phone))
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(dest => dest.nickname, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.given_name, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.family_name, opt => opt.MapFrom(src => src.LastName));

            CreateMap<UserDTO, UpdateAuth0UserRequest>()
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(dest => dest.nickname, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.given_name, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.family_name, opt => opt.MapFrom(src => src.LastName));

            CreateMap<User, UserResponseDTO>()
               .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Roles.FirstOrDefault().Role.Name))
               .ForMember(dest => dest.BusinessUnitName, opt => opt.MapFrom(src => src.Roles.FirstOrDefault().BusinessUnit.Name))
               .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.Roles.FirstOrDefault().RoleId))
               .ForMember(dest => dest.BusinessUnitId, opt => opt.MapFrom(src => src.Roles.FirstOrDefault().BusinessUnitId))
               .ForMember(dest => dest.ReportToUserName, opt => opt.MapFrom(src => src.ReportToUser.FirstName + " " + src.ReportToUser.LastName));

            CreateMap<BusinessUnitDTO, BusinessUnit>().ReverseMap();
            CreateMap<BusinessUnitKeyword, BusinessUnitKeywordDTO>().ReverseMap();
            CreateMap<RoleDTO, Role>().ReverseMap();
            CreateMap<ScriptFieldDTO, BusinessUnit.ScriptField>().ReverseMap();
            CreateMap<CreateOrUpdateScenarioDTO, Scenario>().ReverseMap();
            CreateMap<TaskAssignmentFeedbackDTO, TaskAssignmentFeedback>().ReverseMap();
            CreateMap<TaskAssignmentFeedbackResponseDTO, TaskAssignmentFeedback>();
            CreateMap<TaskAssignmentFeedback, TaskAssignmentFeedbackResponseDTO>()
               .ForMember(src => src.FirstName, opt => opt.MapFrom(dest => dest.CreatedByUser.FirstName))
               .ForMember(src => src.LastName, opt => opt.MapFrom(dest => dest.CreatedByUser.LastName))
               .ForMember(src => src.PictureUrl, opt => opt.MapFrom(dest => dest.CreatedByUser.PictureUrl));

            CreateMap<TaskAssignmentCommentDTO, TaskAssignmentComment>();
            CreateMap<TaskAssignmentComment, TaskAssignmentCommentResponseDTO>()
               .ForMember(src => src.FirstName, opt => opt.MapFrom(dest => dest.CreatedByUser.FirstName))
               .ForMember(src => src.LastName, opt => opt.MapFrom(dest => dest.CreatedByUser.LastName))
               .ForMember(src => src.PictureUrl, opt => opt.MapFrom(dest => dest.CreatedByUser.PictureUrl));

            CreateMap<AudioRehearsal, AudioRehearsalDTO>().ReverseMap();
            CreateMap<VideoRehearsal, VideoRehearsalDTO>().ReverseMap();
            CreateMap<VideoRehearsal, VideoRehearsalResponseDTO>()
                .ForMember(src => src.CreatedByUserName, opt => opt.MapFrom(dest => dest.CreatedByUser.FirstName + " " + dest.CreatedByUser.LastName));

            CreateMap<TaskAssignment, TaskAssignmentDTO>()
                .ForMember(src => src.CreatedByUserName, opt => opt.MapFrom(dest => dest.CreatedByUser.FirstName + " " + dest.CreatedByUser.LastName))
                .ForMember(src => src.UpdatedByUserName, opt => opt.MapFrom(dest => dest.UpdatedByUser.FirstName + " " + dest.UpdatedByUser.LastName));

            CreateMap<Scenario, TaskAssignmentScenarioDTO>()
                .ForMember(src => src.CreatedByUserName, opt => opt.MapFrom(dest => dest.CreatedByUser.FirstName + " " + dest.CreatedByUser.LastName))
                .ForMember(src => src.UpdatedByUserName, opt => opt.MapFrom(dest => dest.UpdatedByUser.FirstName + " " + dest.UpdatedByUser.LastName));

            CreateMap<Script, TaskAssignmentScriptDTO>()
                .ForMember(src => src.CreatedByUserName, opt => opt.MapFrom(dest => dest.CreatedByUser.FirstName + " " + dest.CreatedByUser.LastName))
                .ForMember(src => src.UpdatedByUserName, opt => opt.MapFrom(dest => dest.UpdatedByUser.FirstName + " " + dest.UpdatedByUser.LastName));

            CreateMap<ScriptContent, TaskScriptContentDTO>();
            CreateMap<TaskAssignmentAction, TaskAssignmentActionResponseDTO>().ReverseMap();
        }
    }
}
