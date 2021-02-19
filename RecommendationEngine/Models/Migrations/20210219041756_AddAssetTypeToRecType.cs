using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class AddAssetTypeToRecType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssetTypeRecommendationType",
                columns: table => new
                {
                    AssetTypeId = table.Column<int>(nullable: false),
                    RecommendationTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTypeRecommendationType", x => new { x.AssetTypeId, x.RecommendationTypeId });
                    table.ForeignKey(
                        name: "FK_AssetTypeRecommendationType_AssetType_AssetTypeId",
                        column: x => x.AssetTypeId,
                        principalTable: "AssetType",
                        principalColumn: "AssetTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetTypeRecommendationType_RecommendationType_Recommendatio~",
                        column: x => x.RecommendationTypeId,
                        principalTable: "RecommendationType",
                        principalColumn: "RecommendationTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetTypeRecommendationType_RecommendationTypeId",
                table: "AssetTypeRecommendationType",
                column: "RecommendationTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetTypeRecommendationType");
        }
    }
}
