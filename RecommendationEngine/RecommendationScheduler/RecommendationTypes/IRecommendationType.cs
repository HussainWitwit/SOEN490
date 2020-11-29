using Models.DB;
using Models.Recommendation.YearlyWash;

namespace RecommendationScheduler.RecommendationTypes
{
    public interface IRecommendationType
    {
        public DBRecommendationJobResult ExecuteAlgorithm(DBRecommendationJob job, YearlyWashAPIValues apiValues, YearlyWashParameters parameters);
    }
}