using AutoMapper;
using Dlvr.SixtySeconds.DomainObjects;
using Dlvr.SixtySeconds.Models;
using Dlvr.SixtySeconds.Models.Contexts;
using Dlvr.SixtySeconds.Repositories.Base;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Resources.Localize;
using Dlvr.SixtySeconds.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using Dlvr.SixtySeconds.Shared.Constants;
using System.Security.Cryptography.X509Certificates;

namespace Dlvr.SixtySeconds.Repositories
{
    public class TaskRepository : Repository<Models.Task, TaskPaggerRequestDTO, TaskDTO>, ITaskRepository
    {
        #region"Private variables declaration"
        private readonly IStringLocalizer<Resource> _l;
        #endregion

        #region "Init constructor with DbContext"
        public TaskRepository(SixtySecondsDbContext context, ITokenDTO token, IMapper mapper, IStringLocalizer<Resource> localizer) : base(context, token, mapper)
        {
            _l = localizer;
        }
        #endregion

        #region "Main methods"

        #region Get Task
        public async override Task<PaggerResponseDTO<TaskDTO>> GetAll(TaskPaggerRequestDTO dto)
        {
            try
            {
                Expression<Func<TaskDTO, object>> sortExpression;
                var role = await Context.Roles.FindAsync(Token.RoleId);

                bool isAdmin = role.Name.Equals(RoleType.Admin.ToString(), StringComparison.CurrentCultureIgnoreCase);

                switch (dto.SortBy?.ToLower())
                {
                    case "title":
                        sortExpression = (x => x.Title);
                        break;
                    case "taskManagerName":
                        sortExpression = (x => x.TaskManagerName);
                        break;
                    default:
                        sortExpression = (x => x.CreatedOn);
                        break;
                }
                var taskList = Context.Tasks
                    .Include(x => x.TaskAssignments).ThenInclude(x => x.User)
                    .Include(x => x.TaskAssignments).ThenInclude(x => x.TaskAssignmentActions)
                    .Include(t => t.CreatedByUser).Where(x => x.DeletedOn == null).AsQueryable();

                if (!isAdmin)
                {
                    taskList = taskList.Where(t => t.CreatedBy == Token.Id || t.TaskAssignments.Any(tt => tt.AssignedTo == Token.Id));
                }

                if (!string.IsNullOrEmpty(dto.SearchKeyword))
                {
                    taskList = taskList.Where(x => x.TaskAssignments.Any(y => (y.User.FirstName + " " + y.User.LastName).Contains(dto.SearchKeyword))
                    || x.Title.Contains(dto.SearchKeyword) || (x.CreatedByUser.FirstName + " " + x.CreatedByUser.LastName).Contains(dto.SearchKeyword));
                }

                switch (dto.TaskStatus)
                {
                    case Shared.Enums.TaskStatus.Completed:
                        taskList = taskList.Where(x => x.TaskAssignments.Count(y => y.IsCompleted && !y.IsFeatured) == x.TaskAssignments.Count());
                        break;
                    case Shared.Enums.TaskStatus.InGallery:
                        taskList = taskList.Where(x => x.TaskAssignments.Any(y => y.IsFeatured));
                        break;
                    default://TaskStatus.InProgress
                        taskList = taskList.Where(x => x.IsCompleted == false);
                        break;
                }
                var lst = taskList.Select(x => new TaskDTO
                {
                    Id = x.Id,
                    BusinessUnitId = x.BusinessUnitId,
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn,
                    CompletedOn = x.CompletedOn,
                    IsCompleted = x.IsCompleted,
                    UpdatedBy = x.UpdatedBy,
                    UpdatedOn = x.UpdatedOn,
                    Title = x.Title,
                    Assignees = x.TaskAssignments.Count(),
                    TaskManagerName = x.CreatedByUser.FirstName + " " + x.CreatedByUser.LastName,
                    Submissions = x.TaskAssignments.Where(y => y.IsCompleted == true).Count(),
                    Status = 0,
                    StatusInPercentage = 0,
                    PhotoUrl = string.Empty
                }).AsQueryable();
                lst = dto.FromDate != null ? lst.Where(x => x.CreatedOn != null && x.CreatedOn.Date >= dto.FromDate.Value.Date) : lst;
                lst = dto.ToDate != null ? lst.Where(x => x.CreatedOn != null && x.CreatedOn.Date <= dto.ToDate.Value.Date) : lst;
                return await GetPaggerResponseDTO(lst, dto, sortExpression);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region Get Task Assignment List
        public async Task<List<GetTaskAssignmentDTO>> GetTaskAssignments(long taskId)
        {
            try
            {
                var lst = await Context.TaskAssignments.Where(x => x.TaskId == taskId && x.DeletedOn == null).Include(t => t.CreatedByUser).Include(t => t.UpdatedByUser)
                    .Include(x => x.Task).Include(x => x.User).ThenInclude(x => x.Roles).ThenInclude(x => x.Role)
                    .Include(x => x.TaskAssignmentActions).ToListAsync();

                return lst.Select(ta => GetTaskAssignmentDTO(ta)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private GetTaskAssignmentDTO GetTaskAssignmentDTO(TaskAssignment ta)
        {
            var recentAction = GetLatestAction(ta.TaskAssignmentActions, ActionGroups.AllActions, AssignmentAction.DRAFT);
            return new GetTaskAssignmentDTO()
            {
                Id = ta.Id,
                BusinessUnitId = ta.Task.BusinessUnitId,
                AssigneeId = ta.AssignedTo,
                AssigneeName = ta.User.FirstName + " " + ta.User.LastName,
                AssigneeRole = ta.User.Roles.FirstOrDefault() != null ?
                                    ta.User.Roles.FirstOrDefault().Role.Name : string.Empty,
                CreatedBy = ta.CreatedBy,
                CreatedOn = ta.CreatedOn,
                CreatedByUserName = ta.CreatedByUser != null ? ta.CreatedByUser.FirstName + " " + ta.CreatedByUser.LastName : string.Empty,
                PhotoUrl = ta.User.PictureUrl,
                UpdatedBy = ta.UpdatedBy,
                UpdatedOn = ta.UpdatedOn,
                UpdatedByUserName = ta.UpdatedByUser != null ? ta.UpdatedByUser.FirstName + " " + ta.UpdatedByUser.LastName : string.Empty,
                AudioRehearsalStatus = ta.TaskAssignmentActions.OrderByDescending(x => x.CreatedOn).FirstOrDefault(x => ActionGroups.RehearsalActions.Contains(x.Action)) != null ? true : false,
                ScenarioActionStatus = GetLatestAction(ta.TaskAssignmentActions, ActionGroups.ScenarioActions, AssignmentAction.SCENARIO_PENDING),
                ScriptActionStatus = GetLatestAction(ta.TaskAssignmentActions, ActionGroups.ScriptActions, AssignmentAction.SCRIPT_PENDING),
                VideoActionStatus = GetLatestAction(ta.TaskAssignmentActions, ActionGroups.VideoActions, AssignmentAction.VIDEODELIVERY_PENDING),
                RecentAction = recentAction,
                Web_Message = GetAssignmentActionMessage(recentAction).Web_Message
            };
        }
        private static AssignmentAction GetLatestAction(ICollection<TaskAssignmentAction> taskAssignmentActions, List<AssignmentAction> actionOptions, AssignmentAction defaultAction)
        {
            var taskAction = taskAssignmentActions.OrderByDescending(x => x.CreatedOn).FirstOrDefault(x => actionOptions.Contains(x.Action));
            return taskAction != null ? taskAction.Action : defaultAction;
        }

        private static TaskAssignmentAction GetLatestAction(ICollection<TaskAssignmentAction> taskAssignmentActions, List<AssignmentAction> actionOptions)
        {
            return taskAssignmentActions.OrderByDescending(x => x.CreatedOn).FirstOrDefault(x => actionOptions.Contains(x.Action));
        }

        private async Task<bool> GetScenarioActionStatus(long assignmentId)
        {
            var latestAction = await GetLatestActionAsync(assignmentId,
                new List<AssignmentAction>() { AssignmentAction.SCENARIO_PENDING, AssignmentAction.SCENARIO_APPROVED });
            return latestAction?.Action == AssignmentAction.SCENARIO_APPROVED;
        }
        private async Task<bool> GetScriptActionStatus(long assignmentId)
        {
            var latestAction = await GetLatestActionAsync(assignmentId,
                new List<AssignmentAction>() { AssignmentAction.SCRIPT_PENDING, AssignmentAction.SCRIPT_APPROVED });
            return latestAction?.Action == AssignmentAction.SCRIPT_APPROVED;
        }
        private async Task<bool> GetVideoActionStatus(long assignmentId)
        {
            var latestAction = await GetLatestActionAsync(assignmentId,
                new List<AssignmentAction>() { AssignmentAction.VIDEODELIVERY_PENDING, AssignmentAction.VIDEO_APPROVED });
            return latestAction?.Action == AssignmentAction.VIDEO_APPROVED;
        }


        private async Task<TaskAssignmentAction> GetLatestActionAsync(long taskAssignmentId, List<AssignmentAction> actionOptions)
        {
            return await Context.TaskAssignmentActions.OrderByDescending(x => x.CreatedOn).FirstOrDefaultAsync(x => x.TaskAssignmentId == taskAssignmentId && (actionOptions.Contains(x.Action)));
        }
        #endregion

        #region Get Task list for mobile app
        public async Task<List<GetTaskAssignmentMobileDTO>> GetTaskListForMobile()
        {
            try
            {
                var taskAssignments = await Context.TaskAssignments.Include(x => x.Task).Include(x => x.TaskAssignmentActions)
                    .Where(x => (x.AssignedTo == Token.Id || x.CreatedBy == Token.Id) && x.DeletedOn == null).ToListAsync();
                return taskAssignments.Select(x => GetTaskAssignmentMobileDTO(x)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private GetTaskAssignmentMobileDTO GetTaskAssignmentMobileDTO(TaskAssignment x)
        {
            var audioRehearsalAction = x.TaskAssignmentActions.OrderByDescending(x => x.CreatedOn).FirstOrDefault(x => ActionGroups.RehearsalActions.Contains(x.Action));
            var recentAction = GetLatestAction(x.TaskAssignmentActions, ActionGroups.AllActions, AssignmentAction.DRAFT);
            return new GetTaskAssignmentMobileDTO()
            {
                TaskId = x.Task.Id,
                TaskTitle = x.Task.Title,
                TaskAssignmentId = x.Id,
                PerformedActions = x.TaskAssignmentActions.OrderByDescending(t => t.CreatedOn)
                    .Select(t => new { t.Action }).Distinct()
                    .Select(ta => new TaskAssignmentActionResponseDTO()
                    {
                        Action = ta.Action,
                        Message = GetAssignmentActionMessage(ta.Action),
                        CreatedOn = x.TaskAssignmentActions.OrderByDescending(t => t.CreatedOn).FirstOrDefault(s => s.Action == ta.Action).CreatedOn
                    }).OrderByDescending(x => x.CreatedOn).Take(4),
                AudioRehearsalStatus = audioRehearsalAction != null ? true : false,
                ScenarioActionStatus = GetLatestAction(x.TaskAssignmentActions, ActionGroups.ScenarioActions, AssignmentAction.SCENARIO_PENDING),
                ScriptActionStatus = GetLatestAction(x.TaskAssignmentActions, ActionGroups.ScriptActions, AssignmentAction.SCRIPT_PENDING),
                VideoActionStatus = GetLatestAction(x.TaskAssignmentActions, ActionGroups.VideoActions, AssignmentAction.VIDEODELIVERY_PENDING),
                RecentAction = recentAction,
                MobileTop_Message = GetAssignmentActionMessage(recentAction).MobileTop_Message,
                MobileBottom_Message = GetAssignmentActionMessage(recentAction).MobileBottom_Message,
                MobileBottom_DateTime = SetMobileBottomDateTime(x.TaskAssignmentActions, ActionGroups.AllActions),
            };
        }
        private static DateTime? SetMobileBottomDateTime(ICollection<TaskAssignmentAction> taskAssignmentActions, List<AssignmentAction> actionOptions)
        {
            var taskAction = taskAssignmentActions.OrderByDescending(x => x.CreatedOn).FirstOrDefault(x => actionOptions.Contains(x.Action));
            if (taskAction != null)
            {
                return taskAction.CreatedOn;
            }
            return null;
        }
        #endregion

        #region Get Task Assignment Action Message
        private AssignmentActionMessageDTO GetAssignmentActionMessage(AssignmentAction action)
        {
            switch (action)
            {
                case AssignmentAction.SCENARIO_PENDING:
                    return new AssignmentActionMessageDTO();
                case AssignmentAction.SCENARIO_APPROVED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_SCENARIO_APPROVED]
                    };
                case AssignmentAction.SCRIPT_PENDING:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_SCRIPT_PENDING],
                        MobileTop_Message = _l[Messages.Mobiletop_SCRIPT_PENDING],
                        MobileBottom_Message = _l[Messages.Mobilebottom_SCRIPT_PENDING],
                    };
                case AssignmentAction.SCRIPT_APPROVED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_SCRIPT_APPROVED],
                        MobileTop_Message = _l[Messages.Mobiletop_SCRIPT_APPROVED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_SCRIPT_APPROVED],
                    };
                case AssignmentAction.VIDEODELIVERY_PENDING:
                    return new AssignmentActionMessageDTO();
                case AssignmentAction.VIDEO_APPROVED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_VIDEO_APPROVED],
                        MobileTop_Message = _l[Messages.Mobiletop_VIDEO_APPROVED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_VIDEO_APPROVED],
                    };
                case AssignmentAction.NEW_FEEDBACK:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_NEW_FEEDBACK],
                        MobileTop_Message = _l[Messages.Mobiletop_NEW_FEEDBACK],
                        MobileBottom_Message = _l[Messages.Mobilebottom_NEW_FEEDBACK],
                    };
                case AssignmentAction.FEEDBACK_READ:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_FEEDBACK_READ],
                        MobileTop_Message = _l[Messages.Mobiletop_FEEDBACK_READ],
                        MobileBottom_Message = _l[Messages.Mobilebottom_FEEDBACK_READ],
                    };
                case AssignmentAction.CREATE:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_CREATE],
                        MobileTop_Message = _l[Messages.Mobiletop_CREATE],
                        MobileBottom_Message = _l[Messages.Mobilebottom_CREATE],
                    };
                case AssignmentAction.DRAFT:
                    return new AssignmentActionMessageDTO();
                case AssignmentAction.SCRIPT_READ:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_SCRIPT_READ],
                        MobileTop_Message = _l[Messages.Mobiletop_SCRIPT_READ],
                        MobileBottom_Message = _l[Messages.Mobilebottom_SCRIPT_READ],
                    };
                case AssignmentAction.REHEARSAL_STARTED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_REHEARSAL_STARTED],
                        MobileTop_Message = _l[Messages.Mobiletop_REHEARSAL_STARTED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_REHEARSAL_STARTED],
                    };
                case AssignmentAction.VIDEO_STARTED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_VIDEO_STARTED],
                        MobileTop_Message = _l[Messages.Mobiletop_VIDEO_STARTED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_VIDEO_STARTED],
                    };
                case AssignmentAction.VIDEO_SAVED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_VIDEO_SAVED],
                        MobileTop_Message = _l[Messages.Mobiletop_VIDEO_SAVED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_VIDEO_SAVED],
                    };
                case AssignmentAction.VIDEO_DELETED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_VIDEO_DELETED],
                        MobileTop_Message = _l[Messages.Mobiletop_VIDEO_DELETED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_VIDEO_DELETED],
                    };
                case AssignmentAction.VIDEO_SUBMITTED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_VIDEO_SUBMITTED],
                        MobileTop_Message = _l[Messages.Mobiletop_VIDEO_SUBMITTED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_VIDEO_SUBMITTED],
                    };
                case AssignmentAction.FEATURED:
                    return new AssignmentActionMessageDTO()
                    {
                        Web_Message = _l[Messages.Web_FEATURED],
                        MobileTop_Message = _l[Messages.Mobiletop_FEATURED],
                        MobileBottom_Message = _l[Messages.Mobilebottom_FEATURED],
                    };
                default:
                    return new AssignmentActionMessageDTO();
            }
        }
        #endregion

        #region Get Task Assignment Details
        public async Task<TaskAssignmentDTO> GetTaskAssignment(long taskAssignmentId)
        {
            TaskAssignmentDTO response = new TaskAssignmentDTO();
            var taskAssignment = await Context.TaskAssignments
                .Include(x => x.VideoRehearsals).ThenInclude(t => t.CreatedByUser)
                .Include(x => x.Task).ThenInclude(x => x.BusinessUnit)
                .Include(x => x.TaskAssignmentActions)
                .Include(x => x.Scenario).Include("Scenario.CreatedByUser").Include("Scenario.UpdatedByUser")
                .Include(x => x.Script).ThenInclude(x => x.ScriptContents).Include("Script.CreatedByUser").Include("Script.UpdatedByUser")
                .FirstOrDefaultAsync(x => x.Id == taskAssignmentId && x.DeletedOn == null);

            if (taskAssignment != null)
            {
                Mapper.Map(taskAssignment, response);

                if (response.Scenario != null)
                {
                    response.Scenario.ScenarioKeywords = await Context.ScenarioKeywords.Include(x => x.BusinessUnitKeyword).Where(x => x.ScenarioId == response.Scenario.Id)
                        .Select(x => new ScenarioKeywordDTO() { KeywordId = x.KeywordId, Name = x.BusinessUnitKeyword.Name }).ToListAsync();
                }

                if (response.Script != null && taskAssignment.Script?.ScriptContents != null && taskAssignment.Task?.BusinessUnit?.ScriptFields != null)
                {
                    var businessUnit = Mapper.Map<BusinessUnitDTO>(taskAssignment.Task.BusinessUnit);
                    response.Script.TaskScriptContents = (from sc in taskAssignment.Script.ScriptContents
                                                          join sf in businessUnit.ScriptFieldCollection on sc.ScriptFieldId equals sf.Id
                                                          select new TaskScriptContentDTO()
                                                          {
                                                              Id = sf.Id,
                                                              Index = sf.Index,
                                                              Title = sf.Title,
                                                              ScriptFieldvalue = sc.ScriptFieldvalue,
                                                          }).ToList();
                }

                var recentAction = GetLatestAction(taskAssignment.TaskAssignmentActions, ActionGroups.AllActions);
                var lastScenarioAction = GetLatestAction(taskAssignment.TaskAssignmentActions, ActionGroups.ScenarioActions);
                var lastScriptAction = GetLatestAction(taskAssignment.TaskAssignmentActions, ActionGroups.ScriptActions);
                var lastVideoAction = GetLatestAction(taskAssignment.TaskAssignmentActions, ActionGroups.VideoActions);

                TaskAssignmentActionResponseDTO recentActionResponseDTO = null;
                TaskAssignmentActionResponseDTO lastScenarioActionResponseDTO = null;
                TaskAssignmentActionResponseDTO lastScriptActionResponseDTO = null;
                TaskAssignmentActionResponseDTO lastVideoActionResponseDTO = null;

                if (recentAction != null)
                {
                    recentActionResponseDTO = Mapper.Map<TaskAssignmentActionResponseDTO>(recentAction);
                }
                else
                {
                    recentActionResponseDTO = new TaskAssignmentActionResponseDTO()
                    {
                        Action = AssignmentAction.DRAFT,
                        Message = GetAssignmentActionMessage(AssignmentAction.DRAFT)
                    };
                }

                if (lastScenarioAction != null)
                {
                    lastScenarioActionResponseDTO = Mapper.Map<TaskAssignmentActionResponseDTO>(lastScenarioAction);
                }
                else
                {
                    lastScenarioActionResponseDTO = new TaskAssignmentActionResponseDTO()
                    {
                        Action = AssignmentAction.SCENARIO_PENDING,
                        Message = GetAssignmentActionMessage(AssignmentAction.SCENARIO_PENDING)
                    };
                }

                if (lastScriptAction != null)
                {
                    lastScriptActionResponseDTO = Mapper.Map<TaskAssignmentActionResponseDTO>(lastScriptAction);
                }
                else
                {
                    lastScriptActionResponseDTO = new TaskAssignmentActionResponseDTO()
                    {
                        Action = AssignmentAction.SCRIPT_PENDING,
                        Message = GetAssignmentActionMessage(AssignmentAction.SCRIPT_PENDING)
                    };
                }

                if (lastVideoAction != null)
                {
                    lastVideoActionResponseDTO = Mapper.Map<TaskAssignmentActionResponseDTO>(lastVideoAction);
                }
                else
                {
                    lastVideoActionResponseDTO = new TaskAssignmentActionResponseDTO()
                    {
                        Action = AssignmentAction.VIDEODELIVERY_PENDING,
                        Message = GetAssignmentActionMessage(AssignmentAction.VIDEODELIVERY_PENDING)
                    };
                }

                response.ScenarioActionStatus = lastScenarioAction?.Action == AssignmentAction.SCENARIO_APPROVED;
                response.ScriptActionStatus = lastScriptAction?.Action == AssignmentAction.SCENARIO_APPROVED;
                response.VideoActionStatus = lastVideoAction?.Action == AssignmentAction.VIDEO_APPROVED;
                
                response.LastScenarioAction = lastScenarioActionResponseDTO;
                response.LastScriptAction = lastScriptActionResponseDTO;
                response.LastVideoAction = lastVideoActionResponseDTO;
                response.LastAction = recentActionResponseDTO;
               
                if (lastVideoActionResponseDTO != null)
                {                   
                    response.VideoSubmittedOn = (await GetLatestActionAsync(taskAssignmentId, new List<AssignmentAction>() { AssignmentAction.VIDEO_SUBMITTED }))?.CreatedOn;
                }

                return response;
            }
            return null;
        }
        #endregion

        #region Add or Update Task Details
        public async Task<long> CreateTask(CreateOrUpdateTaskDTO input)
        {
            try
            {
                //Task
                var taskId = await CreateTaskDetails(input.Title);
                foreach (var taskAssignment in input.TaskAssignments)
                {
                    var assignToUser = await Context.TaskAssignments.FirstOrDefaultAsync(x => x.TaskId == taskId && x.AssignedTo == taskAssignment.AssignedTo);
                    if (assignToUser == null)
                    {
                        var taskAssignmentId = await SaveTaskDetails(new TaskAssignment()
                        {
                            TaskId = taskId,
                            AssignedTo = taskAssignment.AssignedTo
                        }, new PutTaskAssignmentDTO()
                        {
                            Scenario = input.Scenario,
                            ScriptContents = input.ScriptContents
                        });
                        await CreateTaskAssignmentAction(new TaskAssignmentActionDTO()
                        {
                            Action = AssignmentAction.CREATE,
                            TaskAssignmentId = taskAssignmentId
                        });
                    }
                }
                return taskId;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private async Task<long> SaveTaskDetails(TaskAssignment taskAssignment, PutTaskAssignmentDTO input)
        {
            ///Scenario
            var scenarioId = await CreateOrUpdateScenario(new CreateOrUpdateScenarioDTO()
            {
                TaskId = taskAssignment.TaskId,
                ScenarioId = taskAssignment.ScenarioId,
                Audience = input.Scenario.Audience,
                Title = input.Scenario.ScenarioTitle,
                Situation = input.Scenario.Situation
            });
            if (input.Scenario.ScenarioKeywords != null)
            {
                await CreateOrUpdateScenarioKeywords(input.Scenario.ScenarioKeywords, scenarioId);
            }

            ///Script
            var scriptId = await CreateOrUpdateScript(scenarioId, taskAssignment.TaskId, taskAssignment.ScriptId);
            if (input.ScriptContents != null)
            {
                await CreateOrUpdateScriptContents(input.ScriptContents, scriptId);
            }

            ///TaskAssignment
            return await SaveTaskAssignment(new TaskAssignment()
            {
                Id = input.TaskAssignmentId,
                AssignedTo = taskAssignment.AssignedTo,
                TaskId = taskAssignment.TaskId,
                ScenarioId = scenarioId,
                ScriptId = scriptId
            });
        }
        private async Task<long> CreateTaskDetails(string taskTitle)
        {
            var task = new Models.Task()
            {
                BusinessUnitId = Token.BusinessUnitId,
                CreatedBy = Token.Id,
                CreatedOn = DateTime.UtcNow,
                Title = taskTitle,
            };
            await Context.Tasks.AddAsync(task);
            await Context.SaveChangesAsync();
            return task.Id;
        }
        private async Task<long> CreateOrUpdateScenario(CreateOrUpdateScenarioDTO input)
        {
            if (input.ScenarioId > 0)
            {
                var entity = await Context.Scenarios.FindAsync(input.ScenarioId);
                if (entity != null)
                {
                    Mapper.Map(input, entity);
                    entity.UpdatedBy = Token.Id;
                    entity.UpdatedOn = DateTime.UtcNow;
                    await Context.SaveChangesAsync();
                    return input.ScenarioId;
                }
            }
            else
            {
                var scenario = new Scenario()
                {
                    CreatedOn = DateTime.UtcNow,
                    CreatedBy = Token.Id
                };
                Mapper.Map(input, scenario);
                await Context.Scenarios.AddAsync(scenario);
                await Context.SaveChangesAsync();
                return scenario.Id;
            }
            return 0;
        }
        private async System.Threading.Tasks.Task CreateOrUpdateScenarioKeywords(List<ScenarioKeywordDTO> input, long scenarioId)
        {
            var existingKeywords = await Context.ScenarioKeywords.Where(x => x.ScenarioId == scenarioId).ToListAsync();
            if (existingKeywords != null) { Context.ScenarioKeywords.RemoveRange(existingKeywords); await Context.SaveChangesAsync(); }
            foreach (var keyword in input)
            {
                if (keyword.KeywordId == 0)
                {
                    keyword.KeywordId = await AddBusinessUnitKeyword(Token.BusinessUnitId, keyword.Name);
                }
                await Context.ScenarioKeywords.AddAsync(new ScenarioKeyword()
                {
                    KeywordId = keyword.KeywordId,
                    ScenarioId = scenarioId
                });
            }
            await Context.SaveChangesAsync();
        }
        private async Task<long> AddBusinessUnitKeyword(long businessUnitId, string keyWord)
        {
            var buKeyword = await Context.BusinessUnitKeywords.FirstOrDefaultAsync(x => x.Name == keyWord);
            if (buKeyword != null)
            { return buKeyword.Id; }
            else
            {
                var bussinessUnitKeyword = new BusinessUnitKeyword()
                {
                    Name = keyWord,
                    BusinessUnitId = businessUnitId
                };
                await Context.BusinessUnitKeywords.AddAsync(bussinessUnitKeyword);
                await Context.SaveChangesAsync();
                return bussinessUnitKeyword.Id;
            }
        }
        private async Task<long> CreateOrUpdateScript(long scenarioId, long taskId, long scriptId)
        {
            if (scriptId > 0)
            {
                var script = await Context.Scripts.FindAsync(scriptId);
                if (script != null)
                {
                    script.UpdatedBy = Token.Id;
                    script.UpdatedOn = DateTime.UtcNow;
                    await Context.SaveChangesAsync();
                }
                return scriptId;
            }
            else
            {
                var script = new Script()
                {
                    TaskId = taskId,
                    ScenarioId = scenarioId,
                    CreatedBy = Token.Id,
                    CreatedOn = DateTime.UtcNow
                };
                await Context.Scripts.AddAsync(script);
                await Context.SaveChangesAsync();
                return script.Id;
            }
        }
        private async System.Threading.Tasks.Task CreateOrUpdateScriptContents(List<ScriptContentDTO> input, long scriptId)
        {
            var scriptContents = await Context.ScriptContents.Where(x => x.ScriptId == scriptId).ToListAsync();
            if (scriptContents != null) { Context.ScriptContents.RemoveRange(scriptContents); await Context.SaveChangesAsync(); }
            foreach (var script in input)
            {
                Context.ScriptContents.Add(new ScriptContent()
                {
                    ScriptId = scriptId,
                    ScriptFieldId = script.ScriptFieldId,
                    ScriptFieldvalue = script.ScriptFieldvalue
                });
            }
            await Context.SaveChangesAsync();
        }
        #endregion

        #region Add or Update Task Assignments

        public async System.Threading.Tasks.Task UpdateTaskAssignment(PutTaskAssignmentDTO input)
        {
            try
            {
                ///Save TaskAssignment and Action
                var taskAssignment = await Context.TaskAssignments.FindAsync(input.TaskAssignmentId);
                if (taskAssignment != null)
                {
                    var taskAssignmentId = await SaveTaskDetails(taskAssignment, input);
                    await CreateTaskAssignmentAction(new TaskAssignmentActionDTO()
                    {
                        Action = AssignmentAction.SCRIPT_PENDING,
                        TaskAssignmentId = taskAssignmentId
                    });
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private async Task<long> SaveTaskAssignment(TaskAssignment input)
        {
            var taskAssignment = await Context.TaskAssignments.FindAsync(input.Id);
            if (taskAssignment != null)
            {
                taskAssignment.UpdatedBy = Token.Id;
                taskAssignment.UpdatedOn = DateTime.UtcNow;
                await Context.SaveChangesAsync();
                return taskAssignment.Id;
            }
            else
            {
                input.CreatedBy = Token.Id;
                input.CreatedOn = DateTime.UtcNow;
                await Context.TaskAssignments.AddAsync(input);
                await Context.SaveChangesAsync();
                return input.Id;
            }
        }
        public async System.Threading.Tasks.Task CreateTaskAssignmentAction(TaskAssignmentActionDTO input)
        {
            try
            {
                var taskAssignment = await Context.TaskAssignments.FindAsync(input.TaskAssignmentId);
                if (taskAssignment != null)
                {
                    var createdOn = input.CreatedOn.HasValue ? Convert.ToDateTime(input.CreatedOn) : DateTime.UtcNow;
                    var taskAssignmentAction = new TaskAssignmentAction()
                    {
                        CreatedBy = Token.Id,
                        CreatedOn = createdOn,
                        Action = input.Action,
                        TaskAssignmentId = input.TaskAssignmentId,
                        TaskId = taskAssignment.TaskId
                    };
                    await Context.TaskAssignmentActions.AddAsync(taskAssignmentAction);
                    await Context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region "ApproveTaskAssignment, UpdateFeatureStatus and ApproveScript"

        //updating the status of taskassignment in case all assignment of task are completed then also updating the status of task to completed//
        public async Task<int> ApproveTaskAssignment(long taskAssignmentId)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var entity = await Context.TaskAssignments.Include(x => x.TaskAssignmentActions).FirstOrDefaultAsync(t => t.Id.Equals(taskAssignmentId) && t.DeletedOn == null);
                    if (entity != null)
                    {
                        var lastScriptAction = GetLatestAction(entity.TaskAssignmentActions, ActionGroups.ScriptActions);
                        if (lastScriptAction.Action == AssignmentAction.SCRIPT_APPROVED)
                        {
                            //updating the status of TaskAssignments//
                            entity.IsCompleted = true;
                            entity.UpdatedOn = DateTime.UtcNow;
                            entity.UpdatedBy = Token.Id;
                            entity.CompletedOn = DateTime.UtcNow;
                            await Context.SaveChangesAsync();

                            await CreateTaskAssignmentAction(new TaskAssignmentActionDTO()
                            {
                                Action = AssignmentAction.VIDEO_APPROVED,
                                TaskAssignmentId = taskAssignmentId
                            });

                            //checking all TaskAssignments for taskId is completed or not//
                            var result = await Context.TaskAssignments.FirstOrDefaultAsync(t => t.TaskId.Equals(entity.TaskId) && t.IsCompleted == false && t.DeletedOn == null);
                            if (result == null)
                            {
                                //updating the status of task//
                                var entityTask = await Context.Tasks.FirstOrDefaultAsync(t => t.Id.Equals(entity.TaskId) && t.DeletedOn == null);
                                if (entityTask != null)
                                {
                                    entityTask.IsCompleted = true;
                                    entityTask.UpdatedOn = DateTime.UtcNow;
                                    entityTask.UpdatedBy = Token.Id;
                                    entityTask.CompletedOn = DateTime.UtcNow;
                                    await Context.SaveChangesAsync();
                                }
                            }
                            transaction.Commit();
                            return await System.Threading.Tasks.Task.FromResult(1);
                        }
                        else
                        {
                            return await System.Threading.Tasks.Task.FromResult(2);
                        }
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return await System.Threading.Tasks.Task.FromResult(0);
                }
            }
            return await System.Threading.Tasks.Task.FromResult(0);
        }

        //updating the status of feature TaskAssignments//
        public async Task<bool> UpdateFeatureStatus(long taskAssignmentId, bool isFeatured)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var entity = await Context.TaskAssignments.FirstOrDefaultAsync(t => t.Id.Equals(taskAssignmentId) && t.DeletedOn == null);
                    if (entity != null)
                    {

                        //updating the status of feature TaskAssignments//
                        entity.IsFeatured = isFeatured;
                        entity.UpdatedOn = DateTime.UtcNow;
                        entity.UpdatedBy = Token.Id;
                        if (isFeatured)
                        {
                            entity.FeaturedOn = DateTime.UtcNow;
                        }
                        else
                        {
                            entity.FeaturedOn = null;
                        }
                        await Context.SaveChangesAsync();
                        if (isFeatured)
                        {
                            await CreateTaskAssignmentAction(new TaskAssignmentActionDTO()
                            {
                                Action = AssignmentAction.FEATURED,
                                TaskAssignmentId = taskAssignmentId
                            });
                        }
                        transaction.Commit();
                        return await System.Threading.Tasks.Task.FromResult(true);
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return await System.Threading.Tasks.Task.FromResult(false);
                }
            }
            return await System.Threading.Tasks.Task.FromResult(false);
        }


        //adding record into taskAssignmentAction table to approve script//
        public async Task<bool> ApproveScenarioScript(long taskId, long taskAssignmentId)
        {
            if (taskId > 0 && taskAssignmentId > 0)
            {
                await AddTaskAssignmentAction(taskId, taskAssignmentId, AssignmentAction.SCENARIO_APPROVED);
                await AddTaskAssignmentAction(taskId, taskAssignmentId, AssignmentAction.SCRIPT_APPROVED);
                return true;
            }

            return false;
        }

        private async Task<bool> AddTaskAssignmentAction(long taskid, long assignmentid, AssignmentAction action)
        {
            TaskAssignmentAction entity = new TaskAssignmentAction();

            entity.TaskId = taskid;
            entity.TaskAssignmentId = assignmentid;
            //approve script
            entity.Action = action;

            entity.CreatedBy = Token.Id;
            entity.CreatedOn = DateTime.UtcNow;
            await Context.TaskAssignmentActions.AddAsync(entity);

            await Context.SaveChangesAsync();
            return true;
        }

        #endregion

        #region Delete Task Assignment
        public async Task<bool> DeleteTaskAssignment(long taskAssignmentId)
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var taskAssignment = await Context.TaskAssignments.FindAsync(taskAssignmentId);
                    if (taskAssignment != null)
                    {
                        var deletedBy = Token.Id;
                        var deletedOn = DateTime.UtcNow;
                        await Context.VideoRehearsals.Where(x => x.TaskAssignmentId == taskAssignmentId)
                            .ForEachAsync(x => { x.DeletedBy = deletedBy; x.DeletedOn = deletedOn; });
                        await Context.AudioRehearsals.Where(x => x.TaskAssignmentId == taskAssignmentId)
                            .ForEachAsync(x => { x.DeletedBy = deletedBy; x.DeletedOn = deletedOn; });
                        await Context.Scenarios.Where(x => x.Id == taskAssignment.ScenarioId)
                            .ForEachAsync(x => { x.DeletedBy = deletedBy; x.DeletedOn = deletedOn; });
                        await Context.Scripts.Where(x => x.Id == taskAssignment.ScriptId)
                            .ForEachAsync(x => { x.DeletedBy = deletedBy; x.DeletedOn = deletedOn; });
                        taskAssignment.DeletedBy = deletedBy;
                        taskAssignment.DeletedOn = deletedOn;
                        await Context.SaveChangesAsync();
                        transaction.Commit();
                        return await System.Threading.Tasks.Task.FromResult(true);
                    }
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return await System.Threading.Tasks.Task.FromResult(false);
                }
            }
            return await System.Threading.Tasks.Task.FromResult(false);
        }
        #endregion
        #endregion
    }
}
