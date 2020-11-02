﻿using System;
using System.Linq;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.configuredRecommendationHelper;
using Interfaces.Repositories;
using RecommendationEngine.Repositories;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private IConfiguredRecommendationRepository _repository;

        public ConfiguredRecommendationService(
                IDriveService driveService,
                IConfiguredRecommendationRepository repsitory
        ) {
            _driveService = driveService;
            _repository = repsitory;
        }

        public List<DBRecommendationSchedule> getConfiguredRecommendationList()
        {
            return _repository.Get();
        }

        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            configuredRecommendation.Validate();
            var recommendationType = _repository.GetRecommendationTypeByType(configuredRecommendation.Type);
            DBRecommendationSchedule config = new DBRecommendationSchedule {
                Name = configuredRecommendation.Title,
                DisplayText = configuredRecommendation.Type,
                ModifiedBy = configuredRecommendation.CreatedBy,
                Granularity = configuredRecommendation.Granularity,
                OccurenceDatetime = configuredRecommendation.OccurrenceDatetime,
                CreatedOn = configuredRecommendation.CreatedOn,
                RecommendationType = recommendationType
            };
            _repository.Add(config);
        }
    }
}