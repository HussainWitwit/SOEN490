using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimeSeriesDataController : ControllerBase
    {
        private TimeSeriesDataService _timeSeriesDataService;

        public TimeSeriesDataController(TimeSeriesDataService timeSeriesDataService)
        {
            _timeSeriesDataService = timeSeriesDataService;
        }
    }
}
