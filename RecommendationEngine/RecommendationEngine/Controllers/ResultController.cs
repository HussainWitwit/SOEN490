using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using Interfaces.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultController : ControllerBase
    {
        private readonly IResultService _resultService;

        public ResultController(IResultService resultService)
        {
            _resultService = resultService;
        }

        [HttpGet()]
        public IActionResult GetResultList()
        {
            try
            {
                return Ok(_resultService.GetResultList());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.ErrorList, e.AppName });
            }
        }
    }
}