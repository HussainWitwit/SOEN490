using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class InternalServerException: GlobalException
    {
        public override IActionResult GetActionResult()
        {
            return new ContentResult
            {
                StatusCode = Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError,
                Content = "There has been an internal server error",
                ContentType = "application/json"
            };
        }
    }
}