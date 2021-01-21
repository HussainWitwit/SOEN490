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

        /// <summary>
        /// Get the configured recommendation list
        /// </summary>
        /// <remarks>
        /// Sample response:
        ///
        ///     [
        ///         {
        ///         "id": 7,
        ///                 "name": "RENEW01_2070.92.005",
        ///                 "type": "Yearly Wash Optimization",
        ///                 "description": "Example description",
        ///                 "granularity": "Yearly",
        ///                 "createdBy": "kenzo",
        ///                 "preferredScenario": "netSaving",
        ///                 "recurrenceDayOfWeek": 1,
        ///                 "recurrenceDatetime": {},
        ///         "createdOn": {},
        ///         "assetIdList": [
        ///           1,
        ///           2
        ///         ],
        ///         "lastJobs": [
        ///           {},
        ///           { },
        ///           { }
        ///         ],
        ///         "assetList": [
        ///           [
        ///             {
        ///               "id": 1,
        ///               "name": "RENEW01_2070.92.005",
        ///               "displayText": "Bizzell Church 2",
        ///               "energyType": "PV",
        ///               "timeZone": "Eastern Standard Time",
        ///               "elementPath": "RENEW01_2070.95.001",
        ///               "assetType": "Plant",
        ///               "acPower": 4950
        ///             },
        ///             {
        ///         "id": 2,
        ///               "name": "RENEW01_2070.94.013",
        ///               "displayText": "RPU",
        ///               "energyType": "PV",
        ///               "timeZone": "Pacific Standard Time",
        ///               "elementPath": "RENEW01_2070.94.013",
        ///               "assetType": "Plant",
        ///               "acPower": 7500
        ///             }
        ///           ]
        ///         ],
        ///         "parameters": [
        ///           "param1",
        ///           "param2"
        ///         ]
        ///       },
        ///       {
        ///         "id": 7,
        ///         "name": "RENEW01_2070.92.005",
        ///         "type": "Yearly Wash Optimization",
        ///         "description": "Example description",
        ///         "granularity": "Yearly",
        ///         "createdBy": "kenzo",
        ///         "preferredScenario": "netSaving",
        ///         "recurrenceDayOfWeek": 1,
        ///         "recurrenceDatetime": { },
        ///         "createdOn": { },
        ///         "assetIdList": [
        ///           1,
        ///           2
        ///         ],
        ///         "lastJobs": [
        ///           { },
        ///           { },
        ///           { }
        ///         ],
        ///         "assetList": [
        ///           [
        ///             {
        ///             "id": 1,
        ///               "name": "RENEW01_2070.92.005",
        ///               "displayText": "Bizzell Church 2",
        ///               "energyType": "PV",
        ///               "timeZone": "Eastern Standard Time",
        ///               "elementPath": "RENEW01_2070.95.001",
        ///               "assetType": "Plant",
        ///               "acPower": 4950
        ///             },
        ///             {
        ///             "id": 2,
        ///               "name": "RENEW01_2070.94.013",
        ///               "displayText": "RPU",
        ///               "energyType": "PV",
        ///               "timeZone": "Pacific Standard Time",
        ///               "elementPath": "RENEW01_2070.94.013",
        ///               "assetType": "Plant",
        ///               "acPower": 7500
        ///             }
        ///           ]
        ///         ],
        ///         "parameters": [
        ///           "param1",
        ///           "param2"
        ///         ]
        ///       }
        ///     ]
        ///
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Sucess Response</response>
        [HttpGet]
        public IActionResult GetConfiguredRecommendationList()
        {
            return Ok(_configuredRecommendationService.GetConfiguredRecommendationList());
        }

        /// <summary>
        /// Get the configured recommendation by id
        /// </summary>
        /// <remarks>
        /// Sample response:
        ///
        ///     {
        ///       "id": 7,
        ///       "name": "RENEW01_2070.92.005",
        ///       "type": "Yearly Wash Optimization",
        ///       "description": "Example description",
        ///       "granularity": "Yearly",
        ///       "createdBy": "kenzo",
        ///       "preferredScenario": "netSaving",
        ///       "recurrenceDayOfWeek": 1,
        ///       "recurrenceDatetime": {},
        ///       "createdOn": {},
        ///       "assetIdList": [
        ///         1,
        ///         2
        ///       ],
        ///       "lastJobs": [
        ///         {},
        ///         {},
        ///         {}
        ///       ],
        ///       "assetList": [
        ///         [
        ///           {
        ///             "id": 1,
        ///             "name": "RENEW01_2070.92.005",
        ///             "displayText": "Bizzell Church 2",
        ///             "energyType": "PV",
        ///             "timeZone": "Eastern Standard Time",
        ///             "elementPath": "RENEW01_2070.95.001",
        ///             "assetType": "Plant",
        ///             "acPower": 4950
        ///           },
        ///           {
        ///         "id": 2,
        ///             "name": "RENEW01_2070.94.013",
        ///             "displayText": "RPU",
        ///             "energyType": "PV",
        ///             "timeZone": "Pacific Standard Time",
        ///             "elementPath": "RENEW01_2070.94.013",
        ///             "assetType": "Plant",
        ///             "acPower": 7500
        ///           }
        ///         ]
        ///       ],
        ///       "parameters": [
        ///         "param1",
        ///         "param2"
        ///       ]
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Sucess Response</response>
        [HttpGet("{id}")]
        public IActionResult GetConfiguredRecommendationById(int id)
        {
            try
            {
                return Ok(_configuredRecommendationService.GetConfiguredRecommendationById(id));
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }

        /// <summary>
        /// Add a recommendation
        /// </summary>
        /// <param name="configuredRecommendation"></param>
        /// <returns></returns>
        /// <response code="200">Sucess Response</response>
        [HttpPost]
        public IActionResult AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            try
            {
                _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation);
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
            return Ok();
        }

        /// <summary>
        /// Edit a recommendation
        /// </summary>
        /// <param name="configuredRecommendation"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Sucess Response</response>
        [HttpPut("{id}")]
        public IActionResult EditConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation, int id)
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

        /// <summary>
        /// Delete a recommendation
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Sucess Response</response>
        [HttpDelete("{id}")]
        public IActionResult DeleteConfiguredRecommendation(int id)
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
