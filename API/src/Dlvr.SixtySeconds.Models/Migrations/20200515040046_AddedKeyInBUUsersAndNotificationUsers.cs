using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class AddedKeyInBUUsersAndNotificationUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusinessUnitUsers_Users_UserId",
                table: "BusinessUnitUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_NotificationUsers_Users_CreatedBy",
                table: "NotificationUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_NotificationUsers_Users_DeletedBy",
                table: "NotificationUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_NotificationUsers_Users_UpdatedBy",
                table: "NotificationUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_BusinessUnits_BusinessUnitId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BusinessUnitId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_CreatedBy",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DeletedBy",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ReportTo",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_UpdatedBy",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_BusinessUnitId",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_CreatedBy",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_DeletedBy",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_NotificationId",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_UpdatedBy",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_UserId",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_BusinessUnitUsers_BusinessUnitId",
                table: "BusinessUnitUsers");

            migrationBuilder.DropIndex(
                name: "IX_BusinessUnitUsers_RoleId",
                table: "BusinessUnitUsers");

            migrationBuilder.DropColumn(
                name: "BusinessUnitId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "NotificationUsers");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "NotificationUsers");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "NotificationUsers");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "NotificationUsers");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "NotificationUsers");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "NotificationUsers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NotificationUsers",
                table: "NotificationUsers",
                columns: new[] { "BusinessUnitId", "UserId", "NotificationId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_BusinessUnitUsers",
                table: "BusinessUnitUsers",
                columns: new[] { "BusinessUnitId", "UserId", "RoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CreatedBy",
                table: "Users",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Users_DeletedBy",
                table: "Users",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ReportTo",
                table: "Users",
                column: "ReportTo");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UpdatedBy",
                table: "Users",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_NotificationId",
                table: "NotificationUsers",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUsers_UserId",
                table: "NotificationUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnitUsers_RoleId",
                table: "BusinessUnitUsers",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessUnitUsers_Users_UserId",
                table: "BusinessUnitUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusinessUnitUsers_Users_UserId",
                table: "BusinessUnitUsers");

            migrationBuilder.DropIndex(
                name: "IX_Users_CreatedBy",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DeletedBy",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ReportTo",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_UpdatedBy",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NotificationUsers",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_NotificationId",
                table: "NotificationUsers");

            migrationBuilder.DropIndex(
                name: "IX_NotificationUsers_UserId",
                table: "NotificationUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BusinessUnitUsers",
                table: "BusinessUnitUsers");

            migrationBuilder.DropIndex(
                name: "IX_BusinessUnitUsers_RoleId",
                table: "BusinessUnitUsers");

            migrationBuilder.AddColumn<long>(
                name: "BusinessUnitId",
                table: "Users",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CreatedBy",
                table: "NotificationUsers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "NotificationUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "DeletedBy",
                table: "NotificationUsers",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "NotificationUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedBy",
                table: "NotificationUsers",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "NotificationUsers",
                type: "datetime2",
                nullable: true);

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
                name: "IX_Users_ReportTo",
                table: "Users",
                column: "ReportTo",
                unique: true,
                filter: "[ReportTo] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UpdatedBy",
                table: "Users",
                column: "UpdatedBy",
                unique: true,
                filter: "[UpdatedBy] IS NOT NULL");

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
                name: "IX_BusinessUnitUsers_BusinessUnitId",
                table: "BusinessUnitUsers",
                column: "BusinessUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnitUsers_RoleId",
                table: "BusinessUnitUsers",
                column: "RoleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessUnitUsers_Users_UserId",
                table: "BusinessUnitUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_Users_BusinessUnits_BusinessUnitId",
                table: "Users",
                column: "BusinessUnitId",
                principalTable: "BusinessUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
