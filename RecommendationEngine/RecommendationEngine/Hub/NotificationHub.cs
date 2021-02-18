using System.Threading.Tasks;
using Interfaces.Hub;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace RecommendationEngine.Hub
{
    // This authorize tag might throw an exception in the UI if no access token is sent
    [Authorize]
    public class NotificationHub: Microsoft.AspNetCore.SignalR.Hub, INotificationHub
    {
        private IHubContext<NotificationHub> _context;
        public NotificationHub(IHubContext<NotificationHub> context)
        {
            _context = context;
        }

        public async Task SendNotification(string message)
        {
            // This should eventually be changed to send notifications to specific groups once defined with proper authentication.
            await _context.Clients.User("Koooohoooookoooooo").SendAsync("ReceiveNotification", message);
        }
    }
}