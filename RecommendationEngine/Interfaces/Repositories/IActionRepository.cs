using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories
{
    public interface IActionRepository
    {
        public List<DBAction> GetActionList();

        public List<DBAction> GetActionsByResultId(int id);
    }
}