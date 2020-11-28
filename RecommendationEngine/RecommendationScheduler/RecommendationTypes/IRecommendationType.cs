using Models.DB;

namespace RecommendationScheduler.RecommendationTypes
{
    public interface IRecommendationType
    {
        public DBRecommendationJobResult ExecuteAlgorithm(DBRecommendationJob job);
    }
}