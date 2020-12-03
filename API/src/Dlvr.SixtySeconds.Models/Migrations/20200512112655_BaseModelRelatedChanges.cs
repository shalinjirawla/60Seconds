using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class BaseModelRelatedChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DeletedBy",
                table: "TaskAssignmentLikes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "TaskAssignmentLikes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignmentLikes_DeletedBy",
                table: "TaskAssignmentLikes",
                column: "DeletedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignmentLikes_Users_DeletedBy",
                table: "TaskAssignmentLikes",
                column: "DeletedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskAssignmentLikes_Users_DeletedBy",
                table: "TaskAssignmentLikes");

            migrationBuilder.DropIndex(
                name: "IX_TaskAssignmentLikes_DeletedBy",
                table: "TaskAssignmentLikes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "TaskAssignmentLikes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "TaskAssignmentLikes");
        }
    }
}
