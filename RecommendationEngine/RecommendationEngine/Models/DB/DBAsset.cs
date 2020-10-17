using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class DBAsset
    {
        public int AssetId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public string TimeZone { get; set; }
        public string ElementPath { get; set; }
        public double AcPower { get; set; }
        public DBAsset ParentAsset { get; set; }
        public DBAssetType Type { get; set; }
        public List<DBAction> ActionsGivenList { get; set; }
        public List<DBRecommendationJobResult> RecommendationJobResultsGivenList { get; set; }
        public List<DBRecommendationSchedule> RecommendationSchedulesList { get; set; }
    }
}
