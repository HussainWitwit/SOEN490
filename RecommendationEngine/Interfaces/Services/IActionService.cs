using System.Collections.Generic;
using Models.Application;

namespace Interfaces.Services
{
    public interface IActionService
    {
        public ActionGrouping GetActionsByResultId(int id);

        public List<CalendarAction> GetNbActionsByDay();
    }
}