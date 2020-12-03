using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class PitchShareToUserADD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ToUser",
                table: "TaskAssignmentShares",
                nullable: false,
                defaultValue: 0L);

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

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentShares_ToUser",
                table: "TaskAssignmentShares",
                column: "ToUser");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentShares_Users_ToUser",
                table: "TaskAssignmentShares",
                column: "ToUser",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskAssignmentShares_Users_ToUser",
                table: "TaskAssignmentShares");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignmentShares_ToUser",
                table: "TaskAssignmentShares");

            migrationBuilder.DropColumn(
                name: "ToUser",
                table: "TaskAssignmentShares");

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
        }
    }
}
