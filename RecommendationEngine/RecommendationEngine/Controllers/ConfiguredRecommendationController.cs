using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Application;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfiguredRecommendationController : ControllerBase
    {
        private IConfiguredRecommendationService _configuredRecommendationService;

        public ConfiguredRecommendationController(IConfiguredRecommendationService configuredRecommendationService)
        {
            _configuredRecommendationService = configuredRecommendationService;
        }

        [HttpGet("get")]
        public IActionResult getConfiguredRecommendationList()
        {
            return Ok(_configuredRecommendationService.GetConfiguredRecommendationList());
        }

        [HttpGet("configuredRecommendation/{id}")]
        public IActionResult GetConfiguredRecommendationById(int id)
        {
            try
            {
                return Ok(_configuredRecommendationService.GetConfiguredRecommendationById(id));

            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.ErrorList, e.AppName });
            }
        }

        [HttpPost("add")]
        public IActionResult AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            try
            {
                _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation);
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.ErrorList, e.AppName });
            }
            return Ok();
        }

        [HttpPost("edit/{id}")]
        public IActionResult editConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation, int id)
        {
            try
            {
                _configuredRecommendationService.EditConfiguredRecommendation(configuredRecommendation, id);
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult deleteConfiguredRecommendation(int id)
        {
            try
            {
                _configuredRecommendationService.DeleteConfiguredRecommendation(id);
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
            return Ok();
        }
    }
}
