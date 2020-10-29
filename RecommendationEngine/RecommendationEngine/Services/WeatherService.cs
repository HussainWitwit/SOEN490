using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class WeatherService
    {
        private IDriveService _driveService;
        private RecommendationEngineDBContext _recommendationEngineRepository;

        public WeatherService(IDriveService driveService, RecommendationEngineDBContext recommendationEngineRepository)
        {
            _driveService = driveService;
            _recommendationEngineRepository = recommendationEngineRepository;
        }
    }
}
