﻿using System.Collections.Generic;
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
                Content = "There has been an error fetching from the database",
                ContentType = "application/json"
            };
        }
    }
}