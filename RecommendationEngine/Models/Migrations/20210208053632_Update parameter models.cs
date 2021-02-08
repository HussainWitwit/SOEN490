using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class Updateparametermodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ParamValue",
                table: "RecommendationScheduleParameter",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<string>(
                name: "DefaultValue",
                table: "RecommendationParameter",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "RecommendationParameter",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "RecommendationParameter");

            migrationBuilder.AlterColumn<double>(
                name: "ParamValue",
                table: "RecommendationScheduleParameter",
                type: "double",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "DefaultValue",
                table: "RecommendationParameter",
                type: "double",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
