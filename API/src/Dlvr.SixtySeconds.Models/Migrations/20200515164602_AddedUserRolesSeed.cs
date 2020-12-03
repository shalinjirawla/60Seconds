using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class AddedUserRolesSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BusinessUnitUsers",
                columns: new[] { "BusinessUnitId", "UserId", "RoleId" },
                values: new object[,]
                {
                    { 1L, 1L, 1 },
                    { 1L, 2L, 2 },
                    { 1L, 3L, 3 }
                });

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BusinessUnitUsers",
                keyColumns: new[] { "BusinessUnitId", "UserId", "RoleId" },
                keyValues: new object[] { 1L, 1L, 1 });

            migrationBuilder.DeleteData(
                table: "BusinessUnitUsers",
                keyColumns: new[] { "BusinessUnitId", "UserId", "RoleId" },
                keyValues: new object[] { 1L, 2L, 2 });

            migrationBuilder.DeleteData(
                table: "BusinessUnitUsers",
                keyColumns: new[] { "BusinessUnitId", "UserId", "RoleId" },
                keyValues: new object[] { 1L, 3L, 3 });

            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 238, DateTimeKind.Utc).AddTicks(5701));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 234, DateTimeKind.Utc).AddTicks(6803));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 234, DateTimeKind.Utc).AddTicks(8734));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 234, DateTimeKind.Utc).AddTicks(8780));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 240, DateTimeKind.Utc).AddTicks(5992));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 240, DateTimeKind.Utc).AddTicks(7671));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 15, 16, 42, 40, 240, DateTimeKind.Utc).AddTicks(8377));
        }
    }
}
