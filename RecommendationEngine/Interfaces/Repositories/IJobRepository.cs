using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories
{
    public interface IJobRepository
    {
        public List<DBRecommendationJob> GetJobList();
    }
}