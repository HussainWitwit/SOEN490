using System.Collections.Generic;

namespace RecommendationEngine.Models.Application.Asset
{
    public abstract class AssetComposite : IAsset
    {
        public List<IAsset> SubAsset { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public string TimeZone { get; set; }
        public string ElementPath { get; set; }
        public double AcPower { get; set; }
    }
}