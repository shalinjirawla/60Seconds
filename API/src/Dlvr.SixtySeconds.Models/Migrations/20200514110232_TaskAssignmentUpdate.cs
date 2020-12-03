using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class TaskAssignmentUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScenarioId",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScriptId",
                table: "TaskAssignments");

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
                name: "IX_TaskAssignments_AssignedTo",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScenarioId",
                table: "TaskAssignments");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignments_ScriptId",
                table: "TaskAssignments");

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
