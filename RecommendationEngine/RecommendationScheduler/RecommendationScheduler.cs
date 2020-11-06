using System;
using System.Collections.Specialized;
using System.Threading.Tasks;
using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Quartz;
using Quartz.Impl;
using Quartz.Logging;
using RecommendationScheduler.RecommendationJob;

namespace RecommendationScheduler
{
    public class RecommendationScheduler: IRecommendationScheduler, IDisposable
    {
        private IScheduler scheduler;
        public static IRecommendationJobLogger JobLogger;
        public static IRecommendationSchedulerRepository RecommendationSchedulerRepository;
        public RecommendationScheduler(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository recommendationSchedulerRepository)
        {
            JobLogger = jobLogger;
            RecommendationSchedulerRepository = recommendationSchedulerRepository;
            Task.Run(this.Start).Wait();
        }
        public async Task Start()
        {
            // Grab the Scheduler instance from the Factory
            NameValueCollection config = new NameValueCollection();
            config["quartz.scheduler.instanceName"] = "RecommendationJobScheduler";
            config["quartz.threadPool.threadCount"] = "2";
            config["quartz.jobStore.type"] = "Quartz.Simpl.RAMJobStore, Quartz";
            config["quartz.threadPool.type"] = "Quartz.Simpl.SimpleThreadPool";
            StdSchedulerFactory factory = new StdSchedulerFactory(config);
            scheduler = await factory.GetScheduler();
            // and start it off
            await scheduler.Start();
            var schedule = RecommendationSchedulerRepository.GetDbRecommendationScheduleById(1);
            await ScheduleJobAsync(schedule);
        }

        public async Task ScheduleJobAsync(DBRecommendationSchedule schedule)
        {
            RecommendationJobFactory factory = new RecommendationJobFactory(schedule);
            scheduler.JobFactory=factory;
            IJobDetail job = JobBuilder.Create<RecommendationJob.RecommendationJob>()
                .WithIdentity(schedule.RecommendationScheduleId.ToString())
                .UsingJobData("recommendationScheduleId", schedule.RecommendationScheduleId)
                .WithDescription(schedule.Description)
                .Build();
            ITrigger trigger = TriggerBuilder.Create()
                .ForJob(job)
                .WithSchedule(ScheduleBuilder(schedule))
                .Build();
            await scheduler.ScheduleJob(job, trigger);
        }

        private IScheduleBuilder ScheduleBuilder(DBRecommendationSchedule schedule)
        {
            switch (schedule.Granularity)
            {
                case "Weekly":
                    return CronScheduleBuilder.WeeklyOnDayAndHourAndMinute(GetDayOfWeek(schedule.RecurrenceDayOfWeek), schedule.RecurrenceDatetime.Hour,
                        schedule.RecurrenceDatetime.Minute);
                case "Monthly":
                    return CronScheduleBuilder.MonthlyOnDayAndHourAndMinute(schedule.RecurrenceDatetime.Day,
                        schedule.RecurrenceDatetime.Hour, schedule.RecurrenceDatetime.Minute);
                case "Yearly":
                    return CronScheduleBuilder.CronSchedule(
                        $"{schedule.RecurrenceDatetime.Minute} {schedule.RecurrenceDatetime.Hour} {schedule.RecurrenceDatetime.Day} {schedule.RecurrenceDatetime.Month} *");
                default:
                    throw new NotImplementedException();
            }
        }

        private DayOfWeek GetDayOfWeek(int i)
        {
            switch (i)
            {
                case 0:
                    return DayOfWeek.Sunday;
                case 1:
                    return DayOfWeek.Monday;
                case 2:
                    return DayOfWeek.Tuesday;
                case 3:
                    return DayOfWeek.Wednesday;
                case 4:
                    return DayOfWeek.Thursday;
                case 5:
                    return DayOfWeek.Friday;
                case 6:
                    return DayOfWeek.Saturday;
                default:
                    throw new NotImplementedException();
            }
        }

        // Autofac should call this method to safely dispose the scheduler in a shutdown
        public async void Dispose()
        {
            await scheduler.Shutdown();
        }
    }
}