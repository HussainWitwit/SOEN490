using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class Addcascadedeleteofweakentites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Action_RecommendationJobResult_RecommendationJobResultId",
                table: "Action");

            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationScheduleParameter_RecommendationSchedule_Sched~",
                table: "RecommendationScheduleParameter");

            migrationBuilder.AddForeignKey(
                name: "FK_Action_RecommendationJobResult_RecommendationJobResultId",
                table: "Action",
                column: "RecommendationJobResultId",
                principalTable: "RecommendationJobResult",
                principalColumn: "RecommendationJobResultId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationScheduleParameter_RecommendationSchedule_Sched~",
                table: "RecommendationScheduleParameter",
                column: "ScheduleRecommendationScheduleId",
                principalTable: "RecommendationSchedule",
                principalColumn: "RecommendationScheduleId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Action_RecommendationJobResult_RecommendationJobResultId",
                table: "Action");

            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationScheduleParameter_RecommendationSchedule_Sched~",
                table: "RecommendationScheduleParameter");

            migrationBuilder.AddForeignKey(
                name: "FK_Action_RecommendationJobResult_RecommendationJobResultId",
                table: "Action",
                column: "RecommendationJobResultId",
                principalTable: "RecommendationJobResult",
                principalColumn: "RecommendationJobResultId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationScheduleParameter_RecommendationSchedule_Sched~",
                table: "RecommendationScheduleParameter",
                column: "ScheduleRecommendationScheduleId",
                principalTable: "RecommendationSchedule",
                principalColumn: "RecommendationScheduleId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
