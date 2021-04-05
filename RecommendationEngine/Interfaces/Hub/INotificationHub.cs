using System.Threading.Tasks;
using Models.Application;

namespace Interfaces.Hub
{
    public interface INotificationHub
    {
        public Task SendNotification(NotificationMessage message);
    }
}