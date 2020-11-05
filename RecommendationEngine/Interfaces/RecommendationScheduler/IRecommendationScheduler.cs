using System.Net.Sockets;
using System.Threading.Tasks;

namespace Interfaces.RecommendationScheduler
{
    public interface IRecommendationScheduler
    {
        public Task Start();
    }
}