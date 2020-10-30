using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.CaseServices
{
    public class CaseService
    {
        private IDriveService _driveService;
        private RecommendationEngineDBContext _recommendationEngineRepository;

        public CaseService(IDriveService driveService, RecommendationEngineDBContext recommendationEngineRepository)
        {
            _driveService = driveService;
            _recommendationEngineRepository = recommendationEngineRepository;
        }
    }
}
