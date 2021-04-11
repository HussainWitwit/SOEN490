using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Application;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfiguredRecommendationController : ControllerBase
    {
        private readonly IConfiguredRecommendationService _configuredRecommendationService;

        public ConfiguredRecommendationController(IConfiguredRecommendationService configuredRecommendationService)
        {
            _configuredRecommendationService = configuredRecommendationService;
        }

        [HttpGet]
        public IActionResult GetConfiguredRecommendationList()
        {
            try
            {
                return Ok(_configuredRecommendationService.GetConfiguredRecommendationList(null));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("filterByAsset/{id?}")]
        public IActionResult GetConfiguredRecommendationListByAssetId(int? id)
        {
            try
            {
                return Ok(_configuredRecommendationService.GetConfiguredRecommendationList(id));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetConfiguredRecommendationById(int id)
        {
            try
            {
                return Ok(_configuredRecommendationService.GetConfiguredRecommendationById(id));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPost]
        public IActionResult AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            try
            {
                _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation);
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult EditConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation, int id)
        {
            try
            {
                _configuredRecommendationService.EditConfiguredRecommendation(configuredRecommendation, id);
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteConfiguredRecommendation(int id)
        {
            try
            {
                _configuredRecommendationService.DeleteConfiguredRecommendation(id);
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
            return Ok();
        }
    }
}
