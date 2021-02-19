using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class DbException: GlobalException
    {
        public override IActionResult GetActionResult()
        {
            return new ContentResult
            {
                StatusCode = Microsoft.AspNetCore.Http.StatusCodes.Status503ServiceUnavailable,
                Content = "The connection with the database has been interrupted. Try again later!",
                ContentType = "application/json"
            };
        }
    }
}