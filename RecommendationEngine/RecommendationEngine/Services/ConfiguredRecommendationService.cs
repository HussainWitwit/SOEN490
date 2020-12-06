using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;
using Models.Application;
using Models.DB;
using RecommendationEngine.configuredRecommendationHelper;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private IConfiguredRecommendationRepository _repository;
        private IRecommendationScheduler _scheduler;

        public ConfiguredRecommendationService(
                IDriveService driveService,
                IConfiguredRecommendationRepository repsitory,
                IRecommendationScheduler scheduler
        )
        {
            _driveService = driveService;
            _repository = repsitory;
            _scheduler = scheduler;
        }

        public List<ConfiguredRecommendation> GetConfiguredRecommendationList()
        {
            List<DBRecommendationSchedule> dbconfiguredRecommendations = _repository.GetRecommendationScheduleList();

            List<ConfiguredRecommendation> recommendations = new List<ConfiguredRecommendation>();

            foreach (DBRecommendationSchedule dbConfigRecommendation in dbconfiguredRecommendations)
            {
                recommendations.Add(
                    new ConfiguredRecommendation
                    {
                        Name = dbConfigRecommendation.Name,
                        Type = dbConfigRecommendation.RecommendationType.Type,
                        Granularity = dbConfigRecommendation.Granularity,
                        CreatedBy = dbConfigRecommendation.ModifiedBy,
                        RecurrenceDayOfWeek = dbConfigRecommendation.RecurrenceDayOfWeek,
                        RecurrenceDatetime = dbConfigRecommendation.RecurrenceDatetime,
                        CreatedOn = dbConfigRecommendation.CreatedOn,
                        Parameters = null
                    });
            }
            return recommendations;
        }

        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            var recommendationType = _repository.GetRecommendationTypeByType(configuredRecommendation.Type);
            configuredRecommendation.Validate(recommendationType);

            DBRecommendationSchedule config = new DBRecommendationSchedule
            {
                Name = configuredRecommendation.Name,
                DisplayText = recommendationType.DisplayText,
                Granularity = configuredRecommendation.Granularity,
                Description = recommendationType.Description,
                CreatedOn = configuredRecommendation.CreatedOn,
                RecurrenceDatetime = configuredRecommendation.RecurrenceDatetime,
                RecurrenceDayOfWeek = configuredRecommendation.RecurrenceDayOfWeek,
                RecommendationType = recommendationType
            };
            var schedule = _repository.Add(config);
            _scheduler.ScheduleJobAsync(schedule);
        }
    }
}