using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("AssetType")]
    public class DBAssetType
    {
        public int AssetTypeId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public virtual List<DBAsset> AssetsList { get; set; }
    }
}
