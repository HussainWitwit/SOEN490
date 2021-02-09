using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public class DbException: GlobalException
    {
        public DbException(List<Error> ErrorList, string AppName)
        {
            this.ErrorList = ErrorList;
            this.AppName = AppName;
        }

        public DbException(Error error, string AppName)
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