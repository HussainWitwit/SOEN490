using System.Threading.Tasks;

namespace Interfaces.Hub
{
    public interface INotificationHub
    {
        public Task SendNotification(string message);
    }
}