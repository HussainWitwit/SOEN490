using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerController : ControllerBase
    {
        private readonly ISchedulerService _schedulerService;

        public SchedulerController(ISchedulerService schedulerService)
        {
            _schedulerService = schedulerService;
        }

        [HttpPut("{id}")]
        public IActionResult GetResultList(int id)
        {
            try
            {
                _schedulerService.ScheduleJob(id);
                return Ok();
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }
    }
}
