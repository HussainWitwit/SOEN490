using System;
using System.Linq;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.configuredRecommendationHelper;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private RecommendationEngineDBContext _recommendationEngineRepository;
        public List<ConfiguredRecommendation> list = new List<ConfiguredRecommendation>();

        public ConfiguredRecommendationService(IDriveService driveService, RecommendationEngineDBContext recommendationEngineRepository)
        {
            _driveService = driveService;
            _recommendationEngineRepository = recommendationEngineRepository;
        }

        public List<DBRecommendationSchedule> getConfiguredRecommendationList()
        {
            List<DBRecommendationSchedule> list = _recommendationEngineRepository.RecommendationSchedules.ToList();
            return list;
        }

        public void addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            configuredRecommendation.Validate();
            addRecommendationToDB(configuredRecommendation);
        }

        private void addRecommendationToDB(ConfiguredRecommendation configuredRecommendation)
        {
            DBRecommendationSchedule context = new DBRecommendationSchedule();
            context.Name = configuredRecommendation.Title;
            context.DisplayText = configuredRecommendation.Type;
            context.ModifiedBy = configuredRecommendation.CreatedBy;
            context.Granularity = configuredRecommendation.Granularity;
            context.OccurenceDatetime = configuredRecommendation.OccurrenceDatetime;
            context.CreatedOn = configuredRecommendation.CreatedOn;
            _recommendationEngineRepository.RecommendationSchedules.Add(context);
            _recommendationEngineRepository.SaveChanges();
        }
    }
}