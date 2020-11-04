namespace RecommendationEngine.Services.ExternalAPI.APIModels
{
    public class PFPlant
    {
        public string Id { get; set; }
        public double AcCapacity { get; set; }
        public string TimeZone { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string PortfolioId { get; set; }
        public string DataResolution { get; set; }
        public string Name { get; set; }
    }
}
