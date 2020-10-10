using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class AssetType
    {
        public int AssetTypeId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public List<Asset> AssetsList { get; set; }
    }
}
