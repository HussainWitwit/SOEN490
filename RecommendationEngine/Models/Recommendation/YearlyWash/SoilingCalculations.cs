using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Recommendation.YearlyWash
{
    public class SoilingCalculations
    {
        public double SoilingDerate { get; set; } // the rate of soiling of a Solar Panel (SP), where 1 has no dirt and 0 is completely covered in dirt and no sunray can reach it
        public double PredictedEnergyAfterSoiling { get; set; } // Predicted Energy produce by SP with its current soil level
        public double PredictedEnergyLoss { get; set; } // The difference between the Predicted Energy and the Predicty Energy due to the soiling levels for that day
        public double PredictedRevenueLoss { get; set; } // Predicted Revenue Loss due to the soiling level
        public double SumOfPredictedRevenueLoss { get; set; } 
    }
}
