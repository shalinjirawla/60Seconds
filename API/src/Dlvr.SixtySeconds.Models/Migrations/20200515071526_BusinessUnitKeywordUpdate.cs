using Microsoft.EntityFrameworkCore.Migrations;

namespace Dlvr.SixtySeconds.Models.Migrations
{
    public partial class BusinessUnitKeywordUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ScenarioKeywords",
                table: "ScenarioKeywords");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "BusinessUnitKeywords",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "BusinessUnitKeywords");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ScenarioKeywords",
                table: "ScenarioKeywords",
                column: "Id");
        }
    }
}
