using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("AssetTypeRecommendationType")]
    public class DBAssetTypeRecommendationType
    {
        public int AssetTypeId { get; set; }
        public int RecommendationTypeId { get; set; }
        public DBAssetType AssetType { get; set; }
        public DBRecommendationType RecommendationType { get; set; }
    }
}