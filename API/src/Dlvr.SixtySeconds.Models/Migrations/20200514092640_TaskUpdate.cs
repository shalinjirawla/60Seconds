using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class TaskUpdate : Migration
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
        }
    }
}
