using Models.DB;
using Models.Recommendation.YearlyWashOptimization;

namespace RecommendationScheduler.RecommendationTypes
{
    public interface IRecommendationType
    {
        public DBRecommendationJobResult ExecuteAlgorithm(YearlyWashAPIValues apiValues, YearlyWashParameters parameters);
    }
}