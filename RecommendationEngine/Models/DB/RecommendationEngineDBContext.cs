using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Models.DB
{
    public class RecommendationEngineDBContext: DbContext
    {
        public DbSet<DBAction> Actions { get; set; }
        public DbSet<DBAsset> Assets { get; set; }
        public DbSet<DBAssetType> AssetTypes { get; set; }
        public DbSet<DBRecommendationJob> RecommendationJobs { get; set; }
        public DbSet<DBRecommendationJobResult> RecommendationJobResults { get; set; }
        public DbSet<DBRecommendationJobLog> RecommendationJobLogs { get; set; }
        public DbSet<DBRecommendationParameter> RecommendationParameters { get; set; }
        public DbSet<DBRecommendationSchedule> RecommendationSchedules { get; set; }
        public DbSet<DBRecommendationScheduleParameter> RecommendationScheduleParameters { get; set; }
        public DbSet<DBRecommendationType> RecommendationTypes { get; set; }
        public DbSet<DBWorkOrder> WorkOrders { get; set; }
        public DbSet<DBAssetRecommendationSchedule> AssetRecommendationSchedules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
                    // Replace with your connection string.
                    "server=localhost;user id=root;port=50023;database=RecommendationEngine",
                    // Replace with your server version and type.
                    mySqlOptions => mySqlOptions
                        .ServerVersion(new Version(1, 0, 0), ServerType.MySql)
                        .CharSetBehavior(CharSetBehavior.NeverAppend))
                // Everything from this point on is optional but helps with debugging.
                .UseLoggerFactory(
                    LoggerFactory.Create(
                        logging => logging
                            .AddFilter(level => level >= LogLevel.Information)))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<DBAssetRecommendationSchedule>()
                .HasKey(c => new { c.AssetId, c.ScheduleId });

            modelBuilder.Entity<DBRecommendationSchedule>()
                .HasMany(x => x.JobsList)
                .WithOne(x => x.Schedule)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DBRecommendationJob>()
                .HasMany(y => y.LogsList)
                .WithOne(x => x.RecommendationJob)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<DBAssetRecommendationSchedule>()
                .HasOne(x => x.Asset)
                .WithMany(m => m.RecommendationSchedulesList)
                .HasForeignKey(x => x.AssetId);
            modelBuilder.Entity<DBAssetRecommendationSchedule>()
                .HasOne(x => x.Schedule)
                .WithMany(e => e.AssetsList)
                .HasForeignKey(x => x.ScheduleId);
        }

    }
}