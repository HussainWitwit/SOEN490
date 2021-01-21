using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
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
            try
            {
                return Ok(_jobService.GetJobList());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }
    }
}