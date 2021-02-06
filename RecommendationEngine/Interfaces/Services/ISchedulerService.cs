using System.Collections.Generic;
using Models.Application;

namespace Interfaces.Services
{

    public interface ISchedulerService
    {
        public void ScheduleJob(int id);
    }
}