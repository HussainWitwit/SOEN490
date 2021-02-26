using System;
using System.Collections.Generic;
using Models.Application;
using Action = Models.Application.Action;

namespace Interfaces.Services
{
    public interface IActionService
    {
        public ActionGrouping GetActionsByResultId(int id);

        public List<Action> GetActionsByDate(DateTime date);
    }
}