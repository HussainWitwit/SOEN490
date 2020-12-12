using System;
using System.Collections.Generic;
using Models.Application.Asset;

namespace Models.Application
{
    public class ConfiguredRecommendation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Granularity { get; set; }
        public string CreatedBy { get; set; }
        public string PreferredScenario { get; set; }
        public int RecurrenceDayOfWeek { get; set; }
        public DateTime RecurrenceDatetime { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<ConfiguredRecommendationJob> LastJobs { get; set; }
        public List<int> AssetIdList { get; set; }
        public List<AssetLeaf> AssetList { get; set; }
        public List<ConfiguredRecommendationParameter> Parameters { get; set; }
    }
}
