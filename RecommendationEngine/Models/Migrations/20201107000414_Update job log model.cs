using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class Updatejoblogmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OccurenceDatetime",
                table: "RecommendationSchedule");

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

            migrationBuilder.AlterColumn<int>(
                name: "JobDuration",
                table: "RecommendationJob",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AlterColumn<DateTime>(
                name: "JobDuration",
                table: "RecommendationJob",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
