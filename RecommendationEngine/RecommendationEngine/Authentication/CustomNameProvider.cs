using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace RecommendationEngine.Authentication
{
    public class CustomNameProvider: IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}