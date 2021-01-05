using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class Addcascadingtoschedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationJob_RecommendationSchedule_ScheduleRecommendat~",
                table: "RecommendationJob");

            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationJobLog_RecommendationJob_RecommendationJobId",
                table: "RecommendationJobLog");

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationJob_RecommendationSchedule_ScheduleRecommendat~",
                table: "RecommendationJob",
                column: "ScheduleRecommendationScheduleId",
                principalTable: "RecommendationSchedule",
                principalColumn: "RecommendationScheduleId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationJobLog_RecommendationJob_RecommendationJobId",
                table: "RecommendationJobLog",
                column: "RecommendationJobId",
                principalTable: "RecommendationJob",
                principalColumn: "RecommendationJobId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationJob_RecommendationSchedule_ScheduleRecommendat~",
                table: "RecommendationJob");

            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationJobLog_RecommendationJob_RecommendationJobId",
                table: "RecommendationJobLog");

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationJob_RecommendationSchedule_ScheduleRecommendat~",
                table: "RecommendationJob",
                column: "ScheduleRecommendationScheduleId",
                principalTable: "RecommendationSchedule",
                principalColumn: "RecommendationScheduleId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationJobLog_RecommendationJob_RecommendationJobId",
                table: "RecommendationJobLog",
                column: "RecommendationJobId",
                principalTable: "RecommendationJob",
                principalColumn: "RecommendationJobId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
