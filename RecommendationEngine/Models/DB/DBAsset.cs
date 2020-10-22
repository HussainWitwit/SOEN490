using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("Asset")]
    public class DBAsset
    {
        [Key]
        public int AssetId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public string TimeZone { get; set; }
        public string ElementPath { get; set; }
        public double AcPower { get; set; }
        public virtual DBAsset ParentAsset { get; set; }
        public virtual DBAssetType Type { get; set; }
        public virtual ICollection<DBAction> ActionsGivenList { get; set; }
        public virtual ICollection<DBRecommendationJobResult> RecommendationJobResultsGivenList { get; set; }
        public virtual ICollection<DBAssetRecommendationSchedule> RecommendationSchedulesList { get; set; }
    }
}
