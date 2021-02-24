﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
namespace Models.Application

{
    public class NotificationMessage
    {
        public string Type { get; set; }
        public string Message { get; set; }
    }

    public class NotificationType
    {
        public static readonly string Information = "Information";
        public static readonly string Error = "Error";
    }
}