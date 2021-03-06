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
                return Ok(_jobService.GetJobList(null));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("filterByAsset/{id?}")]
        public IActionResult GetJobListByAssetId(int? id)
        {
            try
            {
                return Ok(_jobService.GetJobList(id));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("log/{id}")]
        public IActionResult GetJobLogById(int id)
        {
            try
            {
                return Ok(_jobService.GetJobLogsById(id));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }
    }
}