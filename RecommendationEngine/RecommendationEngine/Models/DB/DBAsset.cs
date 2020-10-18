using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("Asset")]
    public class DBAsset
    {
        public int AssetId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public string TimeZone { get; set; }
        public string ElementPath { get; set; }
        public double AcPower { get; set; }
        public virtual DBAsset ParentAsset { get; set; }
        public virtual DBAssetType Type { get; set; }
        public virtual List<DBAction> ActionsGivenList { get; set; }
        public virtual List<DBRecommendationJobResult> RecommendationJobResultsGivenList { get; set; }
        public virtual List<DBRecommendationSchedule> RecommendationSchedulesList { get; set; }
    }
}
