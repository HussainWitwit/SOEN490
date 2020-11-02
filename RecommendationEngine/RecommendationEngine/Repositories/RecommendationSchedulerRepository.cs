using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.Models.Application;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class RecommendationSchedulerRepository: IRecommendationSchedulerRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationSchedulerRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public void AddRecommendationToDB(ConfiguredRecommendation configuredRecommendation) {
            DBRecommendationSchedule context = new DBRecommendationSchedule();
            context.Name = configuredRecommendation.Title;
            context.DisplayText = configuredRecommendation.Type;
            context.ModifiedBy = configuredRecommendation.CreatedBy;
            context.Granularity = configuredRecommendation.Granularity;
            context.OccurenceDatetime = configuredRecommendation.OccurrenceDatetime;
            context.CreatedOn = configuredRecommendation.CreatedOn;
            _recommendationEngineDb.RecommendationSchedules.Add(context);
            _recommendationEngineDb.SaveChanges();
        }
    }
}
