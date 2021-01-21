using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;

        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        /// <summary>
        /// Get all the assets in a flat list representation.
        /// </summary>
        /// <returns>An array of asset objects (with no children attribute)</returns>
        /// <remarks>
        /// Sample response:
        ///
        ///     [
        ///         {
        ///           "id": 7,
        ///           "name": "RENEW01_2070.92.005",
        ///           "displayText": "Bizzell Church 2",
        ///           "energyType": "PV",
        ///           "timeZone": "Eastern Standard Time",
        ///           "elementPath": "RENEW01_2070.95.001",
        ///           "assetType": "Plant",
        ///           "acPower": 4950
        ///         },
        ///         {
        ///           "id": 45,
        ///           "name": "RENEW01_2070.94.013",
        ///           "displayText": "RPU",
        ///           "energyType": "PV",
        ///           "timeZone": "Pacific Standard Time",
        ///           "elementPath": "RENEW01_2070.94.013",
        ///           "assetType": "Plant",
        ///           "acPower": 7500
        ///         }
        ///     ]
        ///
        /// </remarks>
        /// <response code="200">Success Response</response>
        [HttpGet()]
        public IActionResult GetAssetsList()
        {
            try
            {
                return Ok(_assetService.GetAssetsList());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }

        /// <summary>
        /// Get the all the assets in a parent-child object representation.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     [
        ///       {
        ///         "children": [
        ///           {
        ///             "children": [],
        ///             "id": 7,
        ///             "name": "RENEW01_2070.92.005",
        ///             "displayText": "Bizzell Church 2",
        ///             "energyType": "PV",
        ///             "timeZone": "Eastern Standard Time",
        ///             "elementPath": "RENEW01_2070.95.001",
        ///             "assetType": "Plant",
        ///             "acPower": 4950
        ///           }
        ///         ],
        ///         "id": 7,
        ///         "name": "RENEW01_2070.92.005",
        ///         "displayText": "Bizzell Church 2",
        ///         "energyType": "PV",
        ///         "timeZone": "Eastern Standard Time",
        ///         "elementPath": "RENEW01_2070.95.001",
        ///         "assetType": "Plant",
        ///         "acPower": 4950
        ///       }
        ///     ]
        ///
        /// </remarks>
        /// <returns>An Asset object (top most) with its children.</returns>
        /// <response code="200">Success Response</response>
        /// [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet("nested")]
        public IActionResult GetAssetsNested()
        {
            try
            {
                return Ok(_assetService.GetAssetsTreeview());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }
    }
}
