using Models.DB;
using System.Collections.Generic;

namespace Interfaces.Repositories
{
    public interface IConfiguredRecommendationRepository
    {
        public List<DBRecommendationSchedule> GetRecommendationScheduleList();
        public DBRecommendationSchedule Add(DBRecommendationSchedule schedule);
        public void Delete(int id);
        public DBRecommendationType GetRecommendationTypeByType(string recommendationType);
        public DBRecommendationSchedule GetRecommendationScheduleById(int id);
        public List<DBRecommendationParameter> GetParametersForSchedule(DBRecommendationSchedule schedule);
        public DBRecommendationSchedule Edit(DBRecommendationSchedule configuredRecommendation, int id);
    }
}