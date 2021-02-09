using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class DriveApiException: GlobalException
    {
        public override IActionResult GetActionResult()
        {
            return new ContentResult
            {
                StatusCode = Microsoft.AspNetCore.Http.StatusCodes.Status503ServiceUnavailable,
                Content = "PFDrive API is currently unavailable",
                ContentType = "application/json"
            };
        }
    }
}