using Models.DB;
using Models.Recommendation;

namespace RecommendationScheduler.RecommendationTypes
{
    public interface IRecommendationType<in TParameters, in TApiValues>
        where TParameters : RecommendationParameters
        where TApiValues : RecommendationApiValues
    {
        public DBRecommendationJobResult ExecuteAlgorithm(TParameters parameters, TApiValues apiValues);
    }
}