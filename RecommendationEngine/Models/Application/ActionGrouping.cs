using System.Collections.Generic;
using System.Globalization;
using Models.Application.Asset;

namespace Models.Application
{
    public class ActionGrouping
    {
        public int ConfiguredRecommendationId { get; set; }
        public string RecommendationName { get; set; }
        public List<string> AssetNameList { get; set; }
        public List<Action> Actions { get; set; }

    }
}
