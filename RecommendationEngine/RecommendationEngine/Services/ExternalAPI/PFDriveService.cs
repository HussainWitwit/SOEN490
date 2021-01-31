using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Interfaces.Services.ExternalApi;
using Models.Application.APIModels;
using Newtonsoft.Json;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services.ExternalAPI
{
    public abstract class PFDriveService
    {
        private IConfiguration _configuration;
        protected string _driveAPIKey = null;

        // Fetches API Key from secrets
        public PFDriveService(IConfiguration configuration)
        {
            _configuration = configuration;
            _driveAPIKey = _configuration["DriveAPIKey"];
        }
    }
}
