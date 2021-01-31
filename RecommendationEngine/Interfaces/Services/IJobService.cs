using System.Collections.Generic;
using Models.Application;

namespace Interfaces.Services
{

    public interface IJobService
    {
        public List<Job> GetJobList();
        public List<JobLog> GetJobLogsById(int id);
    }
}