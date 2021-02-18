using System.Threading.Tasks;
using Interfaces.Hub;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace RecommendationEngine.Hub
{
    [Authorize]
    public class NotificationHub: Microsoft.AspNetCore.SignalR.Hub, INotificationHub
    {
        private IHubContext<NotificationHub> _context;
        public NotificationHub(IHubContext<NotificationHub> context)
        {
            this._context = context;
        }

        public async Task SendNotification(string message)
        {
            await _context.Clients.All.SendAsync("ReceiveNotification", message);
        }
    }
}