using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories
{
    public interface IResultRepository
    {
        public List<DBRecommendationJobResult> GetResultList();
        public List<DBRecommendationJobResult> GetResultWithActions();
    }
}