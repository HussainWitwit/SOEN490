using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using Microsoft.Extensions.Configuration;

namespace Models.DB
{
    public class RecommendationEngineDBContext : DbContext
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

        private readonly IConfiguration _configuration;

        public RecommendationEngineDBContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string host = _configuration["DBServer"]?? "localhost";
            string port = _configuration["DBPort"]?? "50023";
            optionsBuilder.UseMySql(
                    // Replace with your connection string.
                    $"server={host};user id=root;port={port};database=RecommendationEngine",
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
            modelBuilder.Entity<DBRecommendationJobResult>().HasOne(p => p.Job)
                .WithOne(a => a.Result)
                .HasForeignKey<DBRecommendationJobResult>(a => a.RecommendationJobResultId);

            modelBuilder.Entity<DBAssetRecommendationSchedule>()
                .HasKey(c => new { c.AssetId, c.ScheduleId });

            modelBuilder.Entity<DBAssetRecommendationSchedule>()
                .HasOne(x => x.Asset)
                .WithMany(m => m.RecommendationSchedulesList)
                .HasForeignKey(x => x.AssetId);
            modelBuilder.Entity<DBAssetRecommendationSchedule>()
                .HasOne(x => x.Schedule)
                .WithMany(e => e.AssetsList)
                .HasForeignKey(x => x.ScheduleId);

            // Force cascade delete of weak entities types
            modelBuilder.Entity<DBRecommendationSchedule>()
                .HasMany(x => x.JobsList)
                .WithOne(x => x.Schedule)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DBRecommendationSchedule>()
                .HasMany(x => x.ParametersList)
                .WithOne(x => x.Schedule)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DBRecommendationJob>()
                .HasMany(y => y.LogsList)
                .WithOne(x => x.RecommendationJob)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DBRecommendationJob>()
                .HasOne(y => y.Result)
                .WithOne(x => x.Job)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DBRecommendationJobResult>()
                .HasMany(y => y.ActionsSuggestedList)
                .WithOne(x => x.RecommendationJobResult)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}