using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.Application.Asset;

namespace Models.Application
{
    public class ConfiguredRecommendation
    {
        public int RecommendationId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Granularity { get; set; }
        public string CreatedBy { get; set; }
        public string PreferedScenario { get; set; }
        public int RecurrenceDayOfWeek { get; set; }
        public DateTime RecurrenceDatetime { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<int> AssetIdList { get; set; }
        public List<AssetLeaf> AssetList { get; set; }
        public List<ConfiguredRecommendationParameter> Parameters { get; set; }
    }
}
