using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class Asset
    {
        public int AssetId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public string TimeZone { get; set; }
        public string ElementPath { get; set; }
        public double AcPower { get; set; }
        public Asset ParentAsset { get; set; }
        public AssetType Type { get; set; }
        public List<Action> ActionsGivenList { get; set; }
        public List<RecommendationJobResult> RecommendationJobResultsGivenList { get; set; }
        public List<RecommendationSchedule> RecommendationSchedulesList { get; set; }
    }
}
