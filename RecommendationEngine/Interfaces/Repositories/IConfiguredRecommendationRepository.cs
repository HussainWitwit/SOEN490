using Models.DB;
using System.Collections.Generic;

namespace Interfaces.Repositories
{
    public interface IConfiguredRecommendationRepository
    {
        public List<DBRecommendationSchedule> GetRecommendationScheduleList();
    }
}