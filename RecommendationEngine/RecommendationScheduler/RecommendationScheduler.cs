using System;
using System.Collections.Generic;
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
        private IScheduler _scheduler;
        private IRecommendationSchedulerRepository _recommendationSchedulerRepository;
        public RecommendationScheduler(IScheduler scheduler, IRecommendationSchedulerRepository recommendationSchedulerRepository)
        {
            _recommendationSchedulerRepository = recommendationSchedulerRepository;
            _scheduler = scheduler;
            Task.Run(this.Start).Wait();
        }
        public async Task Start()
        {
            await _scheduler.Start();
            await ScheduleJobsOnStartupAsync();
        }

        public async Task ScheduleJobsOnStartupAsync()
        {
            List<DBRecommendationSchedule> schedules = _recommendationSchedulerRepository.GetDbRecommendationSchedules();
            foreach (var dbRecommendationSchedule in schedules)
            {
                await ScheduleJobAsync(dbRecommendationSchedule);
            }
        }

        public async Task ScheduleJobAsync(DBRecommendationSchedule schedule)
        {
            RecommendationJobFactory factory = new RecommendationJobFactory(schedule);
            IJobDetail job = factory.CreateRecommendationJob();
            ITrigger trigger = TriggerBuilder.Create()
                .ForJob(job)
                .WithSchedule(ScheduleBuilder(schedule))
                .Build();
            await _scheduler.ScheduleJob(job, trigger);
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
                        $"{schedule.RecurrenceDatetime.Second} {schedule.RecurrenceDatetime.Minute} {schedule.RecurrenceDatetime.Hour} {schedule.RecurrenceDatetime.Day} {schedule.RecurrenceDatetime.Month} ? *");
                /*case "Yearly":
                    return CronScheduleBuilder.CronSchedule("* * * ? * *");*/
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
            await _scheduler.Shutdown();
        }
    }
}