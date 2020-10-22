using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("AssetRecommendationSchedule")]
    public class DBAssetRecommendationSchedule
    {
        public int AssetId { get; set; }
        public int ScheduleId { get; set; }
        public DBAsset Asset { get; set; }
        public DBRecommendationSchedule Schedule { get; set; }
    }
}