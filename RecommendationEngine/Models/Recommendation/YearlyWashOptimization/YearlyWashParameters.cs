using System;
using System.Collections.Generic;
using Models.DB;

namespace Models.Recommendation.YearlyWashOptimization
{
    public class YearlyWashParameters: RecommendationParameters
    {
        public DBAsset Asset { get; set; }
        public double CenterPointIncrement { get; set; } 
        public double SpanIncrement { get; set; }
        public DateTime StartSoiling { get; set; }
        public DateTime EndSoiling { get; set; }
        public double SoilingRate { get; set; }
        public double CostCleaning { get; set; }
        public double SoilingBuffer { get; set; }
        public double Accelerator { get; set; }
        public string PreferedScenario { get; set; }
        public List<string> PlantIds { get; set; }
    }
}
