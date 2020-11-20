using Interfaces.Services.ExternalAPI;
using Models.DB;

namespace RecommendationScheduler.RecommendationTypes
{
    public interface IRecommendationType
    {
        public void ExecuteAlgorithm(DBRecommendationJob job);
    }
}