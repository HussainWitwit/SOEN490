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
                return Ok(_resultService.GetResultList(null));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("filterByAsset/{id?}")]
        public IActionResult GetResultListByAssetId(int? id)
        {
            try
            {
                return Ok(_resultService.GetResultList(id));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("widgets/{assetId?}")]
        public IActionResult GetWidgetMetrics(int? assetId)
        {
            try
            {
                return Ok(_resultService.GetWidgetMetrics(assetId));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }
    }
}