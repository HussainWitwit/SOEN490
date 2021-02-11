using Models.Application;

namespace Interfaces.Services
{
    public interface IActionService
    {
        public ActionGrouping GetActionsByResultId(int id);
    }
}