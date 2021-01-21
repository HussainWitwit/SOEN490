using System;
using Microsoft.AspNetCore.Mvc;
using Interfaces.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationTypeController : ControllerBase
    {

        private readonly IRecommendationTypeService _recommendationTypeService;

        public RecommendationTypeController(IRecommendationTypeService recommendationTypeService)
        {
            _recommendationTypeService = recommendationTypeService;
        }

        /// <summary>
        /// Get the list of recommendendation Type
        /// </summary>
        /// <remarks>
        /// Sample response:
        ///
        ///     [
        ///         {
        ///          "templateName": "Yearly Wash Optimization",
        ///           "templateDescription": "Description example",
        ///           "algorithmName": "Yearly Wash Optimization",
        ///           "inputList": [
        ///                {
        ///               "parameterName": "Span Increment",
        ///                "defaultValue": 1
        ///          },
        ///          {
        ///            "parameterName": "Span Increment",
        ///            "defaultValue": 1
        ///           }
        ///          ]
        ///         },
        ///         {
        ///         "templateName": "Yearly Wash Optimization",
        ///          "templateDescription": "Description example",
        ///          "algorithmName": "Yearly Wash Optimization",
        ///          "inputList": []
        ///         }
        ///     ]
        ///
        /// </remarks>
        /// <returns>An array of recommendation type objects. </returns>
        /// <response code="200">Success Response</response>
        [HttpGet]
        public IActionResult GetRecommendationTypes() {
            return Ok(_recommendationTypeService.GetRecommendationTypes());
        }
    }
}
