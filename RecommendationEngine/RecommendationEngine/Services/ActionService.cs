using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.ActionServices
{
    public class ActionService: IActionService
    {
        private IDriveService _driveService;
        private RecommendationEngineDBContext _recommendationEngineRepository;

        public ActionService(IDriveService driveService, RecommendationEngineDBContext recommendationEngineRepository)
        {
            _driveService = driveService;
            _recommendationEngineRepository = recommendationEngineRepository;
        }

        private readonly string[] Summaries = new[]
        {
            "Sup", "Does", "This", "Work", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public string[] GetSummaries()
        {
            return Summaries;
        }
    }
}
