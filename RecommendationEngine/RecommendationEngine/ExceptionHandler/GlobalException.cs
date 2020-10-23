/* The following GlobalException handler responds to any errors
 * received from the front-end when sending a bad status response.
 */

using System;

namespace RecommendationEngine.ExceptionHandler
{
    public class GlobalException : Exception
    {
        public int Code { get; set; }
        public string Type { get; set; }
        public string ErrorMessage { get; set; }
        public string ApplicationName { get; set; }

        public GlobalException(){}

        public GlobalException(int Code, string Type, string ErrorMessage, string ApplicationName) {
            this.Code = Code;
            this.Type = Type;
            this.ErrorMessage = ErrorMessage;
            this.ApplicationName = ApplicationName;
        }
    }
}
