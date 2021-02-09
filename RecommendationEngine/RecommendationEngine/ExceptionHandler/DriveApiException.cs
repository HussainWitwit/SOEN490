using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class DriveApiException: GlobalException
    {
        public DriveApiException(List<Error> ErrorList, string AppName)
        {
            this.ErrorList = ErrorList;
            this.AppName = AppName;
        }

        public DriveApiException(Error error, string AppName)
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