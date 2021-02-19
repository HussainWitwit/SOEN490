using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class RemoveUselessKeyFromAssetTypeRecType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetTypeRecommendationTypeId",
                table: "AssetTypeRecommendationType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetTypeRecommendationTypeId",
                table: "AssetTypeRecommendationType",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
