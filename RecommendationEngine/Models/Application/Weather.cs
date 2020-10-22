using System.Collections.Generic;

namespace RecommendationEngine.Models.Application
{
    public class Weather
    {
        public string CurrentWeather { get; set; }
        public List<WeatherForecast> Forecast { get; set; }
    }
}