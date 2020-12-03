using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class UserSessionChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    BusinessUnitId = table.Column<long>(nullable: false),
                    RoleId = table.Column<int>(nullable: false),
                    LoginDate = table.Column<DateTime>(nullable: false),
                    LogOffDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSessions_BusinessUnits_BusinessUnitId",
                        column: x => x.BusinessUnitId,
                        principalTable: "BusinessUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSessions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSessions_Users_UserId",
                        column: x => x.UserId,
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
                    CreatedBy = table.Column<long>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    UserSessionId = table.Column<Guid>(nullable: false),
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
                        onDelete: ReferentialAction.Restrict);
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
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTokenDetails",
                columns: table => new
                {
                    TokenId = table.Column<Guid>(nullable: false),
                    SessionId = table.Column<Guid>(nullable: false),
                    RefreshToken = table.Column<Guid>(nullable: false),
                    DeviceType = table.Column<int>(nullable: false),
                    DeviceDetails = table.Column<string>(nullable: true),
                    IP = table.Column<string>(nullable: true),
                    IssueOn = table.Column<DateTime>(nullable: false),
                    ExpireOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokenDetails", x => new { x.TokenId, x.SessionId });
                    table.ForeignKey(
                        name: "FK_UserTokenDetails_UserSessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "UserSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 465, DateTimeKind.Utc).AddTicks(7205));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 463, DateTimeKind.Utc).AddTicks(5878));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 463, DateTimeKind.Utc).AddTicks(6933));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 463, DateTimeKind.Utc).AddTicks(6960));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 466, DateTimeKind.Utc).AddTicks(6232));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 466, DateTimeKind.Utc).AddTicks(7035));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 14, 2, 43, 466, DateTimeKind.Utc).AddTicks(7066));

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
                name: "IX_UserSessions_BusinessUnitId",
                table: "UserSessions",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_RoleId",
                table: "UserSessions",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_UserId",
                table: "UserSessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTokenDetails_SessionId",
                table: "UserTokenDetails",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserDeviceTokens");

            migrationBuilder.DropTable(
                name: "UserTokenDetails");

            migrationBuilder.DropTable(
                name: "UserSessions");

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 256, DateTimeKind.Utc).AddTicks(7005));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 255, DateTimeKind.Utc).AddTicks(265));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 255, DateTimeKind.Utc).AddTicks(1017));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 255, DateTimeKind.Utc).AddTicks(1032));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 258, DateTimeKind.Utc).AddTicks(459));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 258, DateTimeKind.Utc).AddTicks(1568));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 26, 9, 43, 36, 258, DateTimeKind.Utc).AddTicks(1617));
        }
    }
}
