using RecommendationEngine.Models.Application;

namespace Interfaces.Repositories
{
    public interface IRecommendationSchedulerRepository
    {
        public void AddRecommendationToDB(ConfiguredRecommendation configuredRecommendation);
    }
}