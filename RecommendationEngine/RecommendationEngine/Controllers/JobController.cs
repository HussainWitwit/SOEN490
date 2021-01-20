using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using System.Threading.Tasks;
using Interfaces.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController: ControllerBase
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet()]
        public IActionResult GetJobList()
        {
            return Ok(_jobService.GetJobList());
        }
    }
}