namespace Models.Application.APIModels
{
    public class PFPPAPrice
    {
        public string PlantElementPath { get; set; }
        public string EffectiveStartTime { get; set; }
        public string EffectiveEndTime { get; set; }
        public double Price { get; set; }
    }
}