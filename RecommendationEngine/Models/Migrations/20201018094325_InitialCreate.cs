using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Models.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssetType",
                columns: table => new
                {
                    AssetTypeId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    DisplayText = table.Column<string>(nullable: true),
                    EnergyType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetType", x => x.AssetTypeId);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationType",
                columns: table => new
                {
                    RecommendationTypeId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(nullable: true),
                    DisplayText = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationType", x => x.RecommendationTypeId);
                });

            migrationBuilder.CreateTable(
                name: "WorkOrder",
                columns: table => new
                {
                    WorkOrderId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DisplayText = table.Column<string>(nullable: true),
                    CostOfWork = table.Column<double>(nullable: false),
                    Time = table.Column<DateTime>(nullable: false),
                    Protocol = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrder", x => x.WorkOrderId);
                });

            migrationBuilder.CreateTable(
                name: "Asset",
                columns: table => new
                {
                    AssetId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    DisplayText = table.Column<string>(nullable: true),
                    EnergyType = table.Column<string>(nullable: true),
                    TimeZone = table.Column<string>(nullable: true),
                    ElementPath = table.Column<string>(nullable: true),
                    AcPower = table.Column<double>(nullable: false),
                    ParentAssetAssetId = table.Column<int>(nullable: true),
                    TypeAssetTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asset", x => x.AssetId);
                    table.ForeignKey(
                        name: "FK_Asset_Asset_ParentAssetAssetId",
                        column: x => x.ParentAssetAssetId,
                        principalTable: "Asset",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Asset_AssetType_TypeAssetTypeId",
                        column: x => x.TypeAssetTypeId,
                        principalTable: "AssetType",
                        principalColumn: "AssetTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationParameter",
                columns: table => new
                {
                    RecommendationParameterId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    DisplayText = table.Column<string>(nullable: true),
                    DefaultValue = table.Column<double>(nullable: false),
                    ForRecommendationTypeRecommendationTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationParameter", x => x.RecommendationParameterId);
                    table.ForeignKey(
                        name: "FK_RecommendationParameter_RecommendationType_ForRecommendation~",
                        column: x => x.ForRecommendationTypeRecommendationTypeId,
                        principalTable: "RecommendationType",
                        principalColumn: "RecommendationTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationSchedule",
                columns: table => new
                {
                    RecommendationScheduleId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ModifiedBy = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    DisplayText = table.Column<string>(nullable: true),
                    Granularity = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    OccurenceDatetime = table.Column<DateTime>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    RecommendationTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationSchedule", x => x.RecommendationScheduleId);
                    table.ForeignKey(
                        name: "FK_RecommendationSchedule_RecommendationType_RecommendationType~",
                        column: x => x.RecommendationTypeId,
                        principalTable: "RecommendationType",
                        principalColumn: "RecommendationTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AssetRecommendationSchedule",
                columns: table => new
                {
                    AssetId = table.Column<int>(nullable: false),
                    ScheduleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetRecommendationSchedule", x => new { x.AssetId, x.ScheduleId });
                    table.ForeignKey(
                        name: "FK_AssetRecommendationSchedule_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetRecommendationSchedule_RecommendationSchedule_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "RecommendationSchedule",
                        principalColumn: "RecommendationScheduleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationJob",
                columns: table => new
                {
                    RecommendationJobId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Status = table.Column<string>(nullable: true),
                    Result = table.Column<string>(nullable: true),
                    TriggeredBy = table.Column<string>(nullable: true),
                    JobDuration = table.Column<DateTime>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    AssetId = table.Column<int>(nullable: true),
                    ScheduleRecommendationScheduleId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationJob", x => x.RecommendationJobId);
                    table.ForeignKey(
                        name: "FK_RecommendationJob_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecommendationJob_RecommendationSchedule_ScheduleRecommendat~",
                        column: x => x.ScheduleRecommendationScheduleId,
                        principalTable: "RecommendationSchedule",
                        principalColumn: "RecommendationScheduleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationScheduleParameter",
                columns: table => new
                {
                    RecommendationScheduleParameterId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DisplayText = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    ParamValue = table.Column<double>(nullable: false),
                    RecommendationParameterId = table.Column<int>(nullable: true),
                    ScheduleRecommendationScheduleId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationScheduleParameter", x => x.RecommendationScheduleParameterId);
                    table.ForeignKey(
                        name: "FK_RecommendationScheduleParameter_RecommendationParameter_Reco~",
                        column: x => x.RecommendationParameterId,
                        principalTable: "RecommendationParameter",
                        principalColumn: "RecommendationParameterId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecommendationScheduleParameter_RecommendationSchedule_Sched~",
                        column: x => x.ScheduleRecommendationScheduleId,
                        principalTable: "RecommendationSchedule",
                        principalColumn: "RecommendationScheduleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationJobLog",
                columns: table => new
                {
                    RecommendationJobLogId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Time = table.Column<DateTime>(nullable: false),
                    Level = table.Column<string>(nullable: true),
                    RecommendationJobId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationJobLog", x => x.RecommendationJobLogId);
                    table.ForeignKey(
                        name: "FK_RecommendationJobLog_RecommendationJob_RecommendationJobId",
                        column: x => x.RecommendationJobId,
                        principalTable: "RecommendationJob",
                        principalColumn: "RecommendationJobId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationJobResult",
                columns: table => new
                {
                    RecommendationJobResultId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DisplayText = table.Column<string>(nullable: true),
                    Result = table.Column<string>(nullable: true),
                    Cost = table.Column<double>(nullable: false),
                    CostOfInaction = table.Column<double>(nullable: false),
                    BenefitOfResult = table.Column<double>(nullable: false),
                    ConfidencePercentage = table.Column<double>(nullable: false),
                    AssetId = table.Column<int>(nullable: true),
                    JobRecommendationJobId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationJobResult", x => x.RecommendationJobResultId);
                    table.ForeignKey(
                        name: "FK_RecommendationJobResult_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecommendationJobResult_RecommendationJob_JobRecommendationJ~",
                        column: x => x.JobRecommendationJobId,
                        principalTable: "RecommendationJob",
                        principalColumn: "RecommendationJobId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Action",
                columns: table => new
                {
                    ActionId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    DisplayText = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    AssetId = table.Column<int>(nullable: true),
                    WorkOrderOpenedWorkOrderId = table.Column<int>(nullable: true),
                    RecommendationJobResultId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Action", x => x.ActionId);
                    table.ForeignKey(
                        name: "FK_Action_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Action_RecommendationJobResult_RecommendationJobResultId",
                        column: x => x.RecommendationJobResultId,
                        principalTable: "RecommendationJobResult",
                        principalColumn: "RecommendationJobResultId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Action_WorkOrder_WorkOrderOpenedWorkOrderId",
                        column: x => x.WorkOrderOpenedWorkOrderId,
                        principalTable: "WorkOrder",
                        principalColumn: "WorkOrderId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Action_AssetId",
                table: "Action",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Action_RecommendationJobResultId",
                table: "Action",
                column: "RecommendationJobResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Action_WorkOrderOpenedWorkOrderId",
                table: "Action",
                column: "WorkOrderOpenedWorkOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ParentAssetAssetId",
                table: "Asset",
                column: "ParentAssetAssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_TypeAssetTypeId",
                table: "Asset",
                column: "TypeAssetTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetRecommendationSchedule_ScheduleId",
                table: "AssetRecommendationSchedule",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationJob_AssetId",
                table: "RecommendationJob",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationJob_ScheduleRecommendationScheduleId",
                table: "RecommendationJob",
                column: "ScheduleRecommendationScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationJobLog_RecommendationJobId",
                table: "RecommendationJobLog",
                column: "RecommendationJobId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationJobResult_AssetId",
                table: "RecommendationJobResult",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationJobResult_JobRecommendationJobId",
                table: "RecommendationJobResult",
                column: "JobRecommendationJobId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationParameter_ForRecommendationTypeRecommendationT~",
                table: "RecommendationParameter",
                column: "ForRecommendationTypeRecommendationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationSchedule_RecommendationTypeId",
                table: "RecommendationSchedule",
                column: "RecommendationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationScheduleParameter_RecommendationParameterId",
                table: "RecommendationScheduleParameter",
                column: "RecommendationParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationScheduleParameter_ScheduleRecommendationSchedu~",
                table: "RecommendationScheduleParameter",
                column: "ScheduleRecommendationScheduleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Action");

            migrationBuilder.DropTable(
                name: "AssetRecommendationSchedule");

            migrationBuilder.DropTable(
                name: "RecommendationJobLog");

            migrationBuilder.DropTable(
                name: "RecommendationScheduleParameter");

            migrationBuilder.DropTable(
                name: "RecommendationJobResult");

            migrationBuilder.DropTable(
                name: "WorkOrder");

            migrationBuilder.DropTable(
                name: "RecommendationParameter");

            migrationBuilder.DropTable(
                name: "RecommendationJob");

            migrationBuilder.DropTable(
                name: "Asset");

            migrationBuilder.DropTable(
                name: "RecommendationSchedule");

            migrationBuilder.DropTable(
                name: "AssetType");

            migrationBuilder.DropTable(
                name: "RecommendationType");
        }
    }
}
