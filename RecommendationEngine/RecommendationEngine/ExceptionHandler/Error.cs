namespace RecommendationEngine.ExceptionHandler
{
    public class Error
    {
        public ErrorType Type { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public Error() { }

        public Error(ErrorType Type, int ErrorCode, string ErrorMessage)
        {
            this.Type = Type;
            this.ErrorCode = ErrorCode;
            this.ErrorMessage = ErrorMessage;
        }
    }
}
