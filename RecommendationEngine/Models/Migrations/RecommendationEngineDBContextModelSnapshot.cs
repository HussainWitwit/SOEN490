﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models.DB;

namespace RecommendationEngine.Migrations
{
    [DbContext(typeof(RecommendationEngineDBContext))]
    partial class RecommendationEngineDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Models.DB.DBAction", b =>
                {
                    b.Property<int>("ActionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AssetId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<int?>("RecommendationJobResultId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.Property<int?>("WorkOrderOpenedWorkOrderId")
                        .HasColumnType("int");

                    b.HasKey("ActionId");

                    b.HasIndex("AssetId");

                    b.HasIndex("RecommendationJobResultId");

                    b.HasIndex("WorkOrderOpenedWorkOrderId");

                    b.ToTable("Action");
                });

            modelBuilder.Entity("Models.DB.DBAsset", b =>
                {
                    b.Property<int>("AssetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("AcPower")
                        .HasColumnType("double");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<string>("ElementPath")
                        .HasColumnType("longtext");

                    b.Property<string>("EnergyType")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<int?>("ParentAssetAssetId")
                        .HasColumnType("int");

                    b.Property<string>("TimeZone")
                        .HasColumnType("longtext");

                    b.Property<int?>("TypeAssetTypeId")
                        .HasColumnType("int");

                    b.HasKey("AssetId");

                    b.HasIndex("ParentAssetAssetId");

                    b.HasIndex("TypeAssetTypeId");

                    b.ToTable("Asset");
                });

            modelBuilder.Entity("Models.DB.DBAssetRecommendationSchedule", b =>
                {
                    b.Property<int>("AssetId")
                        .HasColumnType("int");

                    b.Property<int>("ScheduleId")
                        .HasColumnType("int");

                    b.HasKey("AssetId", "ScheduleId");

                    b.HasIndex("ScheduleId");

                    b.ToTable("AssetRecommendationSchedule");
                });

            modelBuilder.Entity("Models.DB.DBAssetType", b =>
                {
                    b.Property<int>("AssetTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<string>("EnergyType")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("AssetTypeId");

                    b.ToTable("AssetType");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationJob", b =>
                {
                    b.Property<int>("RecommendationJobId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AssetId")
                        .HasColumnType("int");

                    b.Property<int>("JobDuration")
                        .HasColumnType("int");

                    b.Property<int?>("ScheduleRecommendationScheduleId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime");

                    b.Property<string>("TriggeredBy")
                        .HasColumnType("longtext");

                    b.HasKey("RecommendationJobId");

                    b.HasIndex("AssetId");

                    b.HasIndex("ScheduleRecommendationScheduleId");

                    b.ToTable("RecommendationJob");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationJobLog", b =>
                {
                    b.Property<int>("RecommendationJobLogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Level")
                        .HasColumnType("longtext");

                    b.Property<int?>("RecommendationJobId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.HasKey("RecommendationJobLogId");

                    b.HasIndex("RecommendationJobId");

                    b.ToTable("RecommendationJobLog");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationJobResult", b =>
                {
                    b.Property<int>("RecommendationJobResultId")
                        .HasColumnType("int");

                    b.Property<int?>("AssetId")
                        .HasColumnType("int");

                    b.Property<double>("Benefit")
                        .HasColumnType("double");

                    b.Property<double>("ConfidencePercentage")
                        .HasColumnType("double");

                    b.Property<double>("CostOfAction")
                        .HasColumnType("double");

                    b.Property<double>("CostOfInaction")
                        .HasColumnType("double");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<string>("Result")
                        .HasColumnType("longtext");

                    b.HasKey("RecommendationJobResultId");

                    b.HasIndex("AssetId");

                    b.ToTable("RecommendationJobResult");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationParameter", b =>
                {
                    b.Property<int>("RecommendationParameterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("DefaultValue")
                        .HasColumnType("double");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<int?>("ForRecommendationTypeRecommendationTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("RecommendationParameterId");

                    b.HasIndex("ForRecommendationTypeRecommendationTypeId");

                    b.ToTable("RecommendationParameter");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationSchedule", b =>
                {
                    b.Property<int>("RecommendationScheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<string>("Granularity")
                        .HasColumnType("longtext");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("PreferedScenario")
                        .HasColumnType("longtext");

                    b.Property<int?>("RecommendationTypeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RecurrenceDatetime")
                        .HasColumnType("datetime");

                    b.Property<int>("RecurrenceDayOfWeek")
                        .HasColumnType("int");

                    b.HasKey("RecommendationScheduleId");

                    b.HasIndex("RecommendationTypeId");

                    b.ToTable("RecommendationSchedule");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationScheduleParameter", b =>
                {
                    b.Property<int>("RecommendationScheduleParameterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<double>("ParamValue")
                        .HasColumnType("double");

                    b.Property<int?>("RecommendationParameterId")
                        .HasColumnType("int");

                    b.Property<int?>("ScheduleRecommendationScheduleId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime");

                    b.HasKey("RecommendationScheduleParameterId");

                    b.HasIndex("RecommendationParameterId");

                    b.HasIndex("ScheduleRecommendationScheduleId");

                    b.ToTable("RecommendationScheduleParameter");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationType", b =>
                {
                    b.Property<int>("RecommendationTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<string>("EnergyType")
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .HasColumnType("longtext");

                    b.HasKey("RecommendationTypeId");

                    b.ToTable("RecommendationType");
                });

            modelBuilder.Entity("Models.DB.DBWorkOrder", b =>
                {
                    b.Property<int>("WorkOrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("CostOfWork")
                        .HasColumnType("double");

                    b.Property<string>("DisplayText")
                        .HasColumnType("longtext");

                    b.Property<string>("Protocol")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.HasKey("WorkOrderId");

                    b.ToTable("WorkOrder");
                });

            modelBuilder.Entity("Models.DB.DBAction", b =>
                {
                    b.HasOne("Models.DB.DBAsset", "Asset")
                        .WithMany("ActionsGivenList")
                        .HasForeignKey("AssetId");

                    b.HasOne("Models.DB.DBRecommendationJobResult", "RecommendationJobResult")
                        .WithMany("ActionsSuggestedList")
                        .HasForeignKey("RecommendationJobResultId");

                    b.HasOne("Models.DB.DBWorkOrder", "WorkOrderOpened")
                        .WithMany("Actions")
                        .HasForeignKey("WorkOrderOpenedWorkOrderId");
                });

            modelBuilder.Entity("Models.DB.DBAsset", b =>
                {
                    b.HasOne("Models.DB.DBAsset", "ParentAsset")
                        .WithMany()
                        .HasForeignKey("ParentAssetAssetId");

                    b.HasOne("Models.DB.DBAssetType", "Type")
                        .WithMany("AssetsList")
                        .HasForeignKey("TypeAssetTypeId");
                });

            modelBuilder.Entity("Models.DB.DBAssetRecommendationSchedule", b =>
                {
                    b.HasOne("Models.DB.DBAsset", "Asset")
                        .WithMany("RecommendationSchedulesList")
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.DB.DBRecommendationSchedule", "Schedule")
                        .WithMany("AssetsList")
                        .HasForeignKey("ScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Models.DB.DBRecommendationJob", b =>
                {
                    b.HasOne("Models.DB.DBAsset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId");

                    b.HasOne("Models.DB.DBRecommendationSchedule", "Schedule")
                        .WithMany("JobsList")
                        .HasForeignKey("ScheduleRecommendationScheduleId");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationJobLog", b =>
                {
                    b.HasOne("Models.DB.DBRecommendationJob", "RecommendationJob")
                        .WithMany("LogsList")
                        .HasForeignKey("RecommendationJobId");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationJobResult", b =>
                {
                    b.HasOne("Models.DB.DBAsset", "Asset")
                        .WithMany("RecommendationJobResultsGivenList")
                        .HasForeignKey("AssetId");

                    b.HasOne("Models.DB.DBRecommendationJob", "Job")
                        .WithOne("Result")
                        .HasForeignKey("Models.DB.DBRecommendationJobResult", "RecommendationJobResultId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Models.DB.DBRecommendationParameter", b =>
                {
                    b.HasOne("Models.DB.DBRecommendationType", "ForRecommendationType")
                        .WithMany("DefaultParametersList")
                        .HasForeignKey("ForRecommendationTypeRecommendationTypeId");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationSchedule", b =>
                {
                    b.HasOne("Models.DB.DBRecommendationType", "RecommendationType")
                        .WithMany("SchedulesOfTypeList")
                        .HasForeignKey("RecommendationTypeId");
                });

            modelBuilder.Entity("Models.DB.DBRecommendationScheduleParameter", b =>
                {
                    b.HasOne("Models.DB.DBRecommendationParameter", "RecommendationParameter")
                        .WithMany("RecommendationScheduleParametersList")
                        .HasForeignKey("RecommendationParameterId");

                    b.HasOne("Models.DB.DBRecommendationSchedule", "Schedule")
                        .WithMany("ParametersList")
                        .HasForeignKey("ScheduleRecommendationScheduleId");
                });
#pragma warning restore 612, 618
        }
    }
}
