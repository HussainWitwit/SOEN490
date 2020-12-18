using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class RE179changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationJobResult_RecommendationJob_JobRecommendationJ~",
                table: "RecommendationJobResult");

            migrationBuilder.DropIndex(
                name: "IX_RecommendationJobResult_JobRecommendationJobId",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "BenefitOfResult",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "JobRecommendationJobId",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "Result",
                table: "RecommendationJob");

            migrationBuilder.AddColumn<string>(
                name: "PreferedScenario",
                table: "RecommendationSchedule",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RecommendationJobResultId",
                table: "RecommendationJobResult",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<double>(
                name: "Benefit",
                table: "RecommendationJobResult",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CostOfAction",
                table: "RecommendationJobResult",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationJobResult_RecommendationJob_RecommendationJobR~",
                table: "RecommendationJobResult",
                column: "RecommendationJobResultId",
                principalTable: "RecommendationJob",
                principalColumn: "RecommendationJobId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecommendationJobResult_RecommendationJob_RecommendationJobR~",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "PreferedScenario",
                table: "RecommendationSchedule");

            migrationBuilder.DropColumn(
                name: "Benefit",
                table: "RecommendationJobResult");

            migrationBuilder.DropColumn(
                name: "CostOfAction",
                table: "RecommendationJobResult");

            migrationBuilder.AlterColumn<int>(
                name: "RecommendationJobResultId",
                table: "RecommendationJobResult",
                type: "int",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<double>(
                name: "BenefitOfResult",
                table: "RecommendationJobResult",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "RecommendationJobResult",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "JobRecommendationJobId",
                table: "RecommendationJobResult",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Result",
                table: "RecommendationJob",
                type: "longtext",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationJobResult_JobRecommendationJobId",
                table: "RecommendationJobResult",
                column: "JobRecommendationJobId");

            migrationBuilder.AddForeignKey(
                name: "FK_RecommendationJobResult_RecommendationJob_JobRecommendationJ~",
                table: "RecommendationJobResult",
                column: "JobRecommendationJobId",
                principalTable: "RecommendationJob",
                principalColumn: "RecommendationJobId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
