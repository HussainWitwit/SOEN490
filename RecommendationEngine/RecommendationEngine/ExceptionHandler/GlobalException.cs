/* The following GlobalException handler responds to any errors
 * received from the front-end when sending a bad status response.
 */

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.ExceptionHandler
{
    public abstract class GlobalException : Exception
    {
        public List<Error> ErrorList { get; set; }
        public string AppName { get; set; }

        public IReadOnlyList<Error> GetErrorList() {
            //Return an unmodifiable list, we don't want to user to modify the error list in any way, we are overriding the function.

            IReadOnlyList<Error> UnmodifiableErrorList = ErrorList.AsReadOnly();
            return UnmodifiableErrorList;
        }

        public void SetErrorList(List<Error> errorList) {
            //Do nothing, this is an attempt to modify the list, we are overriding the function.
        }

        public abstract IActionResult GetActionResult();
    }
}