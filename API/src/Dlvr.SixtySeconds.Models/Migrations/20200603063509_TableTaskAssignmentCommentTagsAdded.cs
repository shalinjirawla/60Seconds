using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class TableTaskAssignmentCommentTagsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskAssignmentCommentTags",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommentId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: true),
                    BusinessUnitId = table.Column<long>(nullable: true),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignmentCommentTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentCommentTags_BusinessUnits_BusinessUnitId",
                        column: x => x.BusinessUnitId,
                        principalTable: "BusinessUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentCommentTags_TaskAssignmentComments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "TaskAssignmentComments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskAssignmentCommentTags_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 953, DateTimeKind.Utc).AddTicks(9191));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 952, DateTimeKind.Utc).AddTicks(3321));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 952, DateTimeKind.Utc).AddTicks(4297));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 952, DateTimeKind.Utc).AddTicks(4341));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 955, DateTimeKind.Utc).AddTicks(930));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 955, DateTimeKind.Utc).AddTicks(2333));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 6, 3, 6, 35, 6, 955, DateTimeKind.Utc).AddTicks(2385));

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentCommentTags_BusinessUnitId",
                table: "TaskAssignmentCommentTags",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentCommentTags_CommentId",
                table: "TaskAssignmentCommentTags",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentCommentTags_UserId",
                table: "TaskAssignmentCommentTags",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskAssignmentCommentTags");

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 176, DateTimeKind.Utc).AddTicks(7925));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 175, DateTimeKind.Utc).AddTicks(4282));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 175, DateTimeKind.Utc).AddTicks(4986));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 175, DateTimeKind.Utc).AddTicks(5000));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 177, DateTimeKind.Utc).AddTicks(6527));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 177, DateTimeKind.Utc).AddTicks(7370));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 29, 5, 29, 44, 177, DateTimeKind.Utc).AddTicks(7395));
        }
    }
}
