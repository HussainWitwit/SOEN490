﻿using System.Collections.Generic;

namespace Models.Recommendation.YearlyWashOptimization
{
    public class YearlyWashApiValues : RecommendationApiValues
    {
        public List<double> PredictEnergyList { get; set; }// stores predicted energy from API
        public List<double> EnergyPricesList { get; set; }
        public double PlantDCCapacity { get; set; }
    }
}
