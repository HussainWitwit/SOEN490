using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class RequestValidationException: GlobalException
    {
        public RequestValidationException(List<Error> ErrorList, string AppName)
        {
            this.ErrorList = ErrorList;
            this.AppName = AppName;
        }

        public RequestValidationException(Error error, string AppName)
        {
            this.ErrorList = new List<Error> { error };
            this.AppName = AppName;
        }

        public override IActionResult GetActionResult()
        {
            throw new System.NotImplementedException();
        }
    }
}