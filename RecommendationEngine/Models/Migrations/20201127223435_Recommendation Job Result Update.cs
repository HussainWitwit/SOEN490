using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class RecommendationJobResultUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "NetSaving",
                table: "RecommendationJobResult",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ReturnOnInvestment",
                table: "RecommendationJobResult",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NetSaving",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "ReturnOnInvestment",
                table: "RecommendationJobResult");
        }
    }
}
