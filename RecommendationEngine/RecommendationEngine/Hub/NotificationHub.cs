using System.Threading.Tasks;
using Interfaces.Hub;
using Microsoft.AspNetCore.SignalR;

namespace RecommendationEngine.Hub
{
    public class NotificationHub: Microsoft.AspNetCore.SignalR.Hub, INotificationHub
    {
        public async Task SendNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", message);
        }
    }
}