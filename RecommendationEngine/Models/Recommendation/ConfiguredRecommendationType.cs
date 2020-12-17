using System;
using System.Collections.Generic;

namespace Models.Recommendation
{
    public class ConfiguredRecommendationType
    {
        public string TemplateName { get; set; }
        public string TemplateDescription { get; set; }
        public string AlgorithmName { get; set; }
        public List<ConfiguredRecommendationParameter> InputList { get; set; }
    }
}
