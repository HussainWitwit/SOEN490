using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class RequestValidationException: GlobalException
    {
        public RequestValidationException(List<Error> errorList, string appName)
        {
            this.ErrorList = errorList;
            this.AppName = appName;
        }

        public RequestValidationException(Error error, string appName)
        {
            this.ErrorList = new List<Error> { error };
            this.AppName = appName;
        }

        public override IActionResult GetActionResult()
        {
            return new BadRequestObjectResult(new { ErrorList, AppName });
        }
    }
}