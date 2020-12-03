using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class TaskCreatedByUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tasks_BusinessUnitId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_CreatedBy",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_DeletedBy",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScenarioId",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScriptId",
                table: "TaskAssignments");

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 700, DateTimeKind.Utc).AddTicks(7611));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 699, DateTimeKind.Utc).AddTicks(3615));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 699, DateTimeKind.Utc).AddTicks(4378));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 699, DateTimeKind.Utc).AddTicks(4399));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 701, DateTimeKind.Utc).AddTicks(5937));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 701, DateTimeKind.Utc).AddTicks(6700));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 18, 5, 2, 37, 701, DateTimeKind.Utc).AddTicks(6726));

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_BusinessUnitId",
                table: "Tasks",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CreatedBy",
                table: "Tasks",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_DeletedBy",
                table: "Tasks",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments",
                column: "AssignedTo");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_ScenarioId",
                table: "TaskAssignments",
                column: "ScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_ScriptId",
                table: "TaskAssignments",
                column: "ScriptId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tasks_BusinessUnitId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_CreatedBy",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_DeletedBy",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScenarioId",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScriptId",
                table: "TaskAssignments");

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 367, DateTimeKind.Utc).AddTicks(6229));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 363, DateTimeKind.Utc).AddTicks(8756));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 364, DateTimeKind.Utc).AddTicks(1064));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 364, DateTimeKind.Utc).AddTicks(1341));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 369, DateTimeKind.Utc).AddTicks(3108));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 369, DateTimeKind.Utc).AddTicks(4318));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 46, 0, 369, DateTimeKind.Utc).AddTicks(4368));

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_BusinessUnitId",
                table: "Tasks",
                column: "BusinessUnitId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CreatedBy",
                table: "Tasks",
                column: "CreatedBy",
                unique: true,
                filter: "[CreatedBy] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_DeletedBy",
                table: "Tasks",
                column: "DeletedBy",
                unique: true,
                filter: "[DeletedBy] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments",
                column: "AssignedTo",
                unique: true);

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
        }
    }
}
