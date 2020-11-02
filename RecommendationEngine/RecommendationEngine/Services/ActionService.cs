using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.ActionServices
{
    public class ActionService: IActionService
    {
        private IDriveService _driveService;
        private IActionRepository _actionRepository;

        public ActionService(IDriveService driveService, IActionRepository actionRepository)
        {
            _driveService = driveService;
            _actionRepository = actionRepository;
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
