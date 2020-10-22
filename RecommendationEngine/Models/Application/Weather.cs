using System.Collections.Generic;

namespace Models.Application
{
    public class Weather
    {
        public string CurrentWeather { get; set; }
        public List<WeatherForecast> Forecast { get; set; }
    }
}