using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class Addarecommendationupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OccurenceDatetime",
                table: "RecommendationSchedule");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RecommendationType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnergyType",
                table: "RecommendationType",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RecurrenceDatetime",
                table: "RecommendationSchedule",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "RecurrenceDayOfWeek",
                table: "RecommendationSchedule",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "RecommendationType");

            migrationBuilder.DropColumn(
                name: "EnergyType",
                table: "RecommendationType");

            migrationBuilder.DropColumn(
                name: "RecurrenceDatetime",
                table: "RecommendationSchedule");

            migrationBuilder.DropColumn(
                name: "RecurrenceDayOfWeek",
                table: "RecommendationSchedule");

            migrationBuilder.AddColumn<DateTime>(
                name: "OccurenceDatetime",
                table: "RecommendationSchedule",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
