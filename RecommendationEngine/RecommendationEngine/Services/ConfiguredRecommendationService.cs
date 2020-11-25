using System.Collections.Generic;
using Models.Application;
using Interfaces.Services;
using Interfaces.Repositories;
using Models.DB;
using System.Linq;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IConfiguredRecommendationRepository _repository;

        public ConfiguredRecommendationService(
            IConfiguredRecommendationRepository repository
        )
        {
            _repository = repository;
        }

        public List<ConfiguredRecommendation> GetConfiguredRecommendationList()
        {
            List<DBRecommendationSchedule> schedules =  _repository.GetRecommendationScheduleList();
            return schedules.Select((element) => new ConfiguredRecommendation
            {
                Name = element.Name,
                Type = element.RecommendationType.Type,
                Granularity = element.Granularity,
                CreatedBy = element.ModifiedBy,
                RecurrenceDayOfWeek = element.RecurrenceDayOfWeek,
                RecurrenceDatetime = element.RecurrenceDatetime,
                CreatedOn = element.CreatedOn,
                Parameters = null
            }).ToList();
        }
   
    }
}