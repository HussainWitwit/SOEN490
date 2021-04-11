using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class RequestValidationException: GlobalException
    {
        public RequestValidationException(List<Error> errorList, string appName)
        {
            ErrorList = errorList;
            AppName = appName;
        }

        public RequestValidationException(Error error, string appName)
        {
            ErrorList = new List<Error> { error };
            AppName = appName;
        }

        public override IActionResult GetActionResult()
        {
            return new BadRequestObjectResult(new { ErrorList, AppName });
        }
    }
}