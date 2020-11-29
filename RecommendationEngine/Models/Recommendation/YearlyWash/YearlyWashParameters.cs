using System;
using System.Collections.Generic;

namespace Models.Recommendation.YearlyWash
{
    public class YearlyWashParameters
    {
        public double CenterPointIncrement { get; set; } //TODO: CHANGE DOUBLE TO INT IN DB
        public double SpanIncrement { get; set; } //TODO: CHANGE DOUBLE TO INT IN DB
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
