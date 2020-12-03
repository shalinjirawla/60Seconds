using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserSessions",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TokenId = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    Refresh_Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.Id);
                    table.ForeignKey(
                        name: "FK_States_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignmentFeedbacks",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    TaskAssignmentId = table.Column<long>(nullable: false),
                    ScenarioId = table.Column<long>(nullable: true),
                    ScriptId = table.Column<long>(nullable: true),
                    AudioRehearsalId = table.Column<long>(nullable: true),
                    VideoRehearsalId = table.Column<long>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignmentFeedbacks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScenarioKeywords",
                columns: table => new
                {
                    KeywordId = table.Column<long>(nullable: false),
                    ScenarioId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "BusinessUnitKeywords",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessUnitId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessUnitKeywords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BusinessUnitUsers",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    BusinessUnitId = table.Column<long>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "NotificationUsers",
                columns: table => new
                {
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    NotificationId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    BusinessUnitId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    BusinessUnitId = table.Column<long>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    IsCompleted = table.Column<bool>(nullable: false),
                    CompletedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    Auth0Id = table.Column<string>(nullable: true),
                    BusinessUnitId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Users_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Users_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BusinessUnits",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    StateId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    BrandName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    LogoUrl = table.Column<string>(nullable: true),
                    Terms = table.Column<string>(nullable: true),
                    ScriptFields = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessUnits_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusinessUnits_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusinessUnits_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BusinessUnits_States_StateId",
                        column: x => x.StateId,
                        principalTable: "States",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BusinessUnits_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    SubTitle = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    Body = table.Column<string>(nullable: true),
                    Data = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    Auth0RoleId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Roles_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Roles_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Scenarios",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    TaskId = table.Column<long>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Audience = table.Column<string>(nullable: true),
                    Situation = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scenarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scenarios_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Scenarios_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Scenarios_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Scenarios_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserDeviceTokens",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    UserSessionId = table.Column<long>(nullable: false),
                    DeviceToken = table.Column<string>(nullable: true),
                    DeviceType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDeviceTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserDeviceTokens_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDeviceTokens_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserDeviceTokens_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserDeviceTokens_UserSessions_UserSessionId",
                        column: x => x.UserSessionId,
                        principalTable: "UserSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Scripts",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    TaskId = table.Column<long>(nullable: false),
                    ScenarioId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scripts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scripts_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Scripts_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Scripts_Scenarios_ScenarioId",
                        column: x => x.ScenarioId,
                        principalTable: "Scenarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Scripts_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Scripts_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ScriptContents",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScriptId = table.Column<long>(nullable: false),
                    ScriptFieldId = table.Column<int>(nullable: false),
                    ScriptFieldvalue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScriptContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScriptContents_Scripts_ScriptId",
                        column: x => x.ScriptId,
                        principalTable: "Scripts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    TaskId = table.Column<long>(nullable: false),
                    ScenarioId = table.Column<long>(nullable: false),
                    ScriptId = table.Column<long>(nullable: false),
                    AssignedTo = table.Column<long>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    IsFeatured = table.Column<bool>(nullable: false),
                    CompletedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Users_AssignedTo",
                        column: x => x.AssignedTo,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Scenarios_ScenarioId",
                        column: x => x.ScenarioId,
                        principalTable: "Scenarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Scripts_ScriptId",
                        column: x => x.ScriptId,
                        principalTable: "Scripts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AudioRehearsals",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    TaskAssignmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioRehearsals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AudioRehearsals_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AudioRehearsals_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AudioRehearsals_TaskAssignments_TaskAssignmentId",
                        column: x => x.TaskAssignmentId,
                        principalTable: "TaskAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignmentActions",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    TaskId = table.Column<long>(nullable: false),
                    TaskAssignmentId = table.Column<long>(nullable: false),
                    Action = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignmentActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentActions_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentActions_TaskAssignments_TaskAssignmentId",
                        column: x => x.TaskAssignmentId,
                        principalTable: "TaskAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentActions_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignmentComments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    TaskAssignmentId = table.Column<long>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignmentComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentComments_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentComments_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentComments_TaskAssignments_TaskAssignmentId",
                        column: x => x.TaskAssignmentId,
                        principalTable: "TaskAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignmentLikes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    TaskAssignmentId = table.Column<long>(nullable: false),
                    IsLiked = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignmentLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentLikes_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentLikes_TaskAssignments_TaskAssignmentId",
                        column: x => x.TaskAssignmentId,
                        principalTable: "TaskAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentLikes_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignmentShares",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    TaskAssignmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignmentShares", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentShares_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentShares_TaskAssignments_TaskAssignmentId",
                        column: x => x.TaskAssignmentId,
                        principalTable: "TaskAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VideoRehearsals",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    TaskAssignmentId = table.Column<long>(nullable: false),
                    VideoUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoRehearsals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoRehearsals_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VideoRehearsals_Users_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VideoRehearsals_TaskAssignments_TaskAssignmentId",
                        column: x => x.TaskAssignmentId,
                        principalTable: "TaskAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AudioRehearsals_CreatedBy",
                table: "AudioRehearsals",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_AudioRehearsals_DeletedBy",
                table: "AudioRehearsals",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_AudioRehearsals_TaskAssignmentId",
                table: "AudioRehearsals",
                column: "TaskAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnitKeywords_BusinessUnitId",
                table: "BusinessUnitKeywords",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnits_CountryId",
                table: "BusinessUnits",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnits_CreatedBy",
                table: "BusinessUnits",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnits_DeletedBy",
                table: "BusinessUnits",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnits_StateId",
                table: "BusinessUnits",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnits_UpdatedBy",
                table: "BusinessUnits",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnitUsers_BusinessUnitId",
                table: "BusinessUnitUsers",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnitUsers_RoleId",
                table: "BusinessUnitUsers",
                column: "RoleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnitUsers_UserId",
                table: "BusinessUnitUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CreatedBy",
                table: "Notifications",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_DeletedBy",
                table: "Notifications",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_BusinessUnitId",
                table: "NotificationUsers",
                column: "BusinessUnitId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_CreatedBy",
                table: "NotificationUsers",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_DeletedBy",
                table: "NotificationUsers",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_NotificationId",
                table: "NotificationUsers",
                column: "NotificationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_UpdatedBy",
                table: "NotificationUsers",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_UserId",
                table: "NotificationUsers",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_CreatedBy",
                table: "Roles",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_DeletedBy",
                table: "Roles",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_UpdatedBy",
                table: "Roles",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ScenarioKeywords_KeywordId",
                table: "ScenarioKeywords",
                column: "KeywordId");

            migrationBuilder.CreateIndex(
                name: "IX_ScenarioKeywords_ScenarioId",
                table: "ScenarioKeywords",
                column: "ScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_CreatedBy",
                table: "Scenarios",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_DeletedBy",
                table: "Scenarios",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_TaskId",
                table: "Scenarios",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Scenarios_UpdatedBy",
                table: "Scenarios",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ScriptContents_ScriptId",
                table: "ScriptContents",
                column: "ScriptId");

            migrationBuilder.CreateIndex(
                name: "IX_Scripts_CreatedBy",
                table: "Scripts",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Scripts_DeletedBy",
                table: "Scripts",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Scripts_ScenarioId",
                table: "Scripts",
                column: "ScenarioId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Scripts_TaskId",
                table: "Scripts",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Scripts_UpdatedBy",
                table: "Scripts",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_States_CountryId",
                table: "States",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentActions_CreatedBy",
                table: "TaskAssignmentActions",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentActions_TaskAssignmentId",
                table: "TaskAssignmentActions",
                column: "TaskAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentActions_TaskId",
                table: "TaskAssignmentActions",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentComments_CreatedBy",
                table: "TaskAssignmentComments",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentComments_DeletedBy",
                table: "TaskAssignmentComments",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentComments_TaskAssignmentId",
                table: "TaskAssignmentComments",
                column: "TaskAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_AudioRehearsalId",
                table: "TaskAssignmentFeedbacks",
                column: "AudioRehearsalId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_CreatedBy",
                table: "TaskAssignmentFeedbacks",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_DeletedBy",
                table: "TaskAssignmentFeedbacks",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_ScenarioId",
                table: "TaskAssignmentFeedbacks",
                column: "ScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_ScriptId",
                table: "TaskAssignmentFeedbacks",
                column: "ScriptId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_TaskAssignmentId",
                table: "TaskAssignmentFeedbacks",
                column: "TaskAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentFeedbacks_VideoRehearsalId",
                table: "TaskAssignmentFeedbacks",
                column: "VideoRehearsalId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentLikes_CreatedBy",
                table: "TaskAssignmentLikes",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentLikes_TaskAssignmentId",
                table: "TaskAssignmentLikes",
                column: "TaskAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentLikes_UpdatedBy",
                table: "TaskAssignmentLikes",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments",
                column: "AssignedTo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_CreatedBy",
                table: "TaskAssignments",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_DeletedBy",
                table: "TaskAssignments",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_ScenarioId",
                table: "TaskAssignments",
                column: "ScenarioId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_ScriptId",
                table: "TaskAssignments",
                column: "ScriptId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_TaskId",
                table: "TaskAssignments",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_UpdatedBy",
                table: "TaskAssignments",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentShares_CreatedBy",
                table: "TaskAssignmentShares",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentShares_TaskAssignmentId",
                table: "TaskAssignmentShares",
                column: "TaskAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_BusinessUnitId",
                table: "Tasks",
                column: "BusinessUnitId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CreatedBy",
                table: "Tasks",
                column: "CreatedBy",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_DeletedBy",
                table: "Tasks",
                column: "DeletedBy",
                unique: true,
                filter: "[DeletedBy] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_UpdatedBy",
                table: "Tasks",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceTokens_CreatedBy",
                table: "UserDeviceTokens",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceTokens_DeletedBy",
                table: "UserDeviceTokens",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceTokens_UpdatedBy",
                table: "UserDeviceTokens",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceTokens_UserSessionId",
                table: "UserDeviceTokens",
                column: "UserSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_BusinessUnitId",
                table: "Users",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CreatedBy",
                table: "Users",
                column: "CreatedBy",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_DeletedBy",
                table: "Users",
                column: "DeletedBy",
                unique: true,
                filter: "[DeletedBy] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UpdatedBy",
                table: "Users",
                column: "UpdatedBy",
                unique: true,
                filter: "[UpdatedBy] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_VideoRehearsals_CreatedBy",
                table: "VideoRehearsals",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_VideoRehearsals_DeletedBy",
                table: "VideoRehearsals",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_VideoRehearsals_TaskAssignmentId",
                table: "VideoRehearsals",
                column: "TaskAssignmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_Users_CreatedBy",
                table: "TaskAssignmentFeedbacks",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_Users_DeletedBy",
                table: "TaskAssignmentFeedbacks",
                column: "DeletedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_TaskAssignments_TaskAssignmentId",
                table: "TaskAssignmentFeedbacks",
                column: "TaskAssignmentId",
                principalTable: "TaskAssignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_Scenarios_ScenarioId",
                table: "TaskAssignmentFeedbacks",
                column: "ScenarioId",
                principalTable: "Scenarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_Scripts_ScriptId",
                table: "TaskAssignmentFeedbacks",
                column: "ScriptId",
                principalTable: "Scripts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_AudioRehearsals_AudioRehearsalId",
                table: "TaskAssignmentFeedbacks",
                column: "AudioRehearsalId",
                principalTable: "AudioRehearsals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentFeedbacks_VideoRehearsals_VideoRehearsalId",
                table: "TaskAssignmentFeedbacks",
                column: "VideoRehearsalId",
                principalTable: "VideoRehearsals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ScenarioKeywords_BusinessUnitKeywords_KeywordId",
                table: "ScenarioKeywords",
                column: "KeywordId",
                principalTable: "BusinessUnitKeywords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ScenarioKeywords_Scenarios_ScenarioId",
                table: "ScenarioKeywords",
                column: "ScenarioId",
                principalTable: "Scenarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessUnitKeywords_BusinessUnits_BusinessUnitId",
                table: "BusinessUnitKeywords",
                column: "BusinessUnitId",
                principalTable: "BusinessUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessUnitUsers_Users_UserId",
                table: "BusinessUnitUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessUnitUsers_BusinessUnits_BusinessUnitId",
                table: "BusinessUnitUsers",
                column: "BusinessUnitId",
                principalTable: "BusinessUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessUnitUsers_Roles_RoleId",
                table: "BusinessUnitUsers",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationUsers_Users_CreatedBy",
                table: "NotificationUsers",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationUsers_Users_DeletedBy",
                table: "NotificationUsers",
                column: "DeletedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationUsers_Users_UpdatedBy",
                table: "NotificationUsers",
                column: "UpdatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationUsers_Users_UserId",
                table: "NotificationUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationUsers_BusinessUnits_BusinessUnitId",
                table: "NotificationUsers",
                column: "BusinessUnitId",
                principalTable: "BusinessUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationUsers_Notifications_NotificationId",
                table: "NotificationUsers",
                column: "NotificationId",
                principalTable: "Notifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_CreatedBy",
                table: "Tasks",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_DeletedBy",
                table: "Tasks",
                column: "DeletedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_UpdatedBy",
                table: "Tasks",
                column: "UpdatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_BusinessUnits_BusinessUnitId",
                table: "Tasks",
                column: "BusinessUnitId",
                principalTable: "BusinessUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_BusinessUnits_BusinessUnitId",
                table: "Users",
                column: "BusinessUnitId",
                principalTable: "BusinessUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusinessUnits_Users_CreatedBy",
                table: "BusinessUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_BusinessUnits_Users_DeletedBy",
                table: "BusinessUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_BusinessUnits_Users_UpdatedBy",
                table: "BusinessUnits");

            migrationBuilder.DropTable(
                name: "BusinessUnitUsers");

            migrationBuilder.DropTable(
                name: "NotificationUsers");

            migrationBuilder.DropTable(
                name: "ScenarioKeywords");

            migrationBuilder.DropTable(
                name: "ScriptContents");

            migrationBuilder.DropTable(
                name: "TaskAssignmentActions");

            migrationBuilder.DropTable(
                name: "TaskAssignmentComments");

            migrationBuilder.DropTable(
                name: "TaskAssignmentFeedbacks");

            migrationBuilder.DropTable(
                name: "TaskAssignmentLikes");

            migrationBuilder.DropTable(
                name: "TaskAssignmentShares");

            migrationBuilder.DropTable(
                name: "UserDeviceTokens");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "BusinessUnitKeywords");

            migrationBuilder.DropTable(
                name: "AudioRehearsals");

            migrationBuilder.DropTable(
                name: "VideoRehearsals");

            migrationBuilder.DropTable(
                name: "UserSessions");

            migrationBuilder.DropTable(
                name: "TaskAssignments");

            migrationBuilder.DropTable(
                name: "Scripts");

            migrationBuilder.DropTable(
                name: "Scenarios");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "BusinessUnits");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
