using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class ActionService: IActionService
    {
        private IDriveService _driveService;

        public ActionService(IDriveService driveService)
        {
            _driveService = driveService;
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
