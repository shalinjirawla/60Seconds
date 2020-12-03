using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class SeedUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 22, 19, 30, 14, 948, DateTimeKind.Utc).AddTicks(1718));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Auth0RoleId", "CreatedOn" },
                values: new object[] { "rol_OgEP5bCa89sY17JG", new DateTime(2020, 5, 22, 19, 30, 14, 947, DateTimeKind.Utc).AddTicks(2952) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Auth0RoleId", "CreatedOn" },
                values: new object[] { "rol_LLTgQ3r0mHMyeH8b", new DateTime(2020, 5, 22, 19, 30, 14, 947, DateTimeKind.Utc).AddTicks(3436) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Auth0RoleId", "CreatedOn" },
                values: new object[] { "rol_v0AmlMLlkkbk5BI0", new DateTime(2020, 5, 22, 19, 30, 14, 947, DateTimeKind.Utc).AddTicks(3449) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 22, 19, 30, 14, 948, DateTimeKind.Utc).AddTicks(6943));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "Auth0Id", "CreatedOn", "FirstName", "LastName" },
                values: new object[] { "auth0|5eac66d09721430be8d148bc", new DateTime(2020, 5, 22, 19, 30, 14, 948, DateTimeKind.Utc).AddTicks(7455), "Sales", "Manager" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "Auth0Id", "CreatedOn", "Email", "FirstName", "LastName" },
                values: new object[] { "auth0|5e9a8226e6e7eb0bdfb35ddd", new DateTime(2020, 5, 22, 19, 30, 14, 948, DateTimeKind.Utc).AddTicks(7476), "pavan@thedlvr.co.in", "Pavan", "Welihinda" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BusinessUnits",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 19, 17, 32, 57, 440, DateTimeKind.Utc).AddTicks(7350));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Auth0RoleId", "CreatedOn" },
                values: new object[] { "", new DateTime(2020, 5, 19, 17, 32, 57, 438, DateTimeKind.Utc).AddTicks(9217) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Auth0RoleId", "CreatedOn" },
                values: new object[] { "", new DateTime(2020, 5, 19, 17, 32, 57, 439, DateTimeKind.Utc).AddTicks(53) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Auth0RoleId", "CreatedOn" },
                values: new object[] { "", new DateTime(2020, 5, 19, 17, 32, 57, 439, DateTimeKind.Utc).AddTicks(62) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreatedOn",
                value: new DateTime(2020, 5, 19, 17, 32, 57, 442, DateTimeKind.Utc).AddTicks(887));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "Auth0Id", "CreatedOn", "FirstName", "LastName" },
                values: new object[] { "", new DateTime(2020, 5, 19, 17, 32, 57, 442, DateTimeKind.Utc).AddTicks(2167), "Coach", "" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "Auth0Id", "CreatedOn", "Email", "FirstName", "LastName" },
                values: new object[] { "", new DateTime(2020, 5, 19, 17, 32, 57, 442, DateTimeKind.Utc).AddTicks(2193), "hitesh@thedlvr.co.in", "Sales Person", "" });
        }
    }
}
