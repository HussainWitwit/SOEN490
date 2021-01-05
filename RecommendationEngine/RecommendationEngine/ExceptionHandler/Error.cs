namespace RecommendationEngine.ExceptionHandler
{
    public class Error
    {
        public string Type { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public Error() { }

        public Error(string Type, int ErrorCode, string ErrorMessage)
        {
            this.Type = Type;
            this.ErrorCode = ErrorCode;
            this.ErrorMessage = ErrorMessage;
        }
    }
}
