/* The following GlobalException handler responds to any errors
 * received from the front-end when sending a bad status response.
 */

using System;
using System.Collections.Generic;

namespace RecommendationEngine.ExceptionHandler
{
    public class GlobalException : Exception
    {
        public List<Error> ErrorList { get; set; }
        public string AppName { get; set; }

        public GlobalException() { }

        public GlobalException(List<Error> ErrorList, string AppName)
        {
            this.ErrorList = ErrorList;
            this.AppName = AppName;
        }

        public GlobalException(Error error, string AppName)
        {
            this.ErrorList = new List<Error> { error };
            this.AppName = AppName;
        }

        public IReadOnlyList<Error> GetErrorList() {
            //Return an unmodifiable list, we don't want to user to modify the error list in any way, we are overriding the function.

            IReadOnlyList<Error> UnmodifiableErrorList = ErrorList.AsReadOnly();
            return UnmodifiableErrorList;
        }

        public void SetErrorList(List<Error> errorList) {
            //Do nothing, this is an attempt to modify the list, we are overriding the function.
        }
    }
}