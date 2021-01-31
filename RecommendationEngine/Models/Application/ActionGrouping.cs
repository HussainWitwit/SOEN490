using System.Collections.Generic;
using Models.Application.Asset;

namespace Models.Application
{
    public class ActionGrouping
    {
        public string RecommendationName { get; set; }
        public List<string> AssetNameList { get; set; }
        public List<Action> Actions { get; set; }

    }
}
