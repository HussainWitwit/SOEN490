using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.Services
{
    public class ResultService : IResultService
    {
        private IResultRepository _resultRepository;

        public ResultService(
            IResultRepository resultRepository
        )
        {
            _resultRepository = resultRepository;
        }
        public List<Result> GetResultList()
        {
            try
            {
                return _resultRepository.GetResultList().Select(dbResult =>
                        new Result
                        {
                            Id = dbResult.RecommendationJobResultId,
                            CostOfAction = dbResult.CostOfAction,
                            CostOfInaction = dbResult.CostOfInaction,
                            NetSaving = dbResult.NetSaving,
                            ReturnOnInvestment = dbResult.ReturnOnInvestment,
                            ConfiguredRecommendationId = dbResult.Job.Schedule.RecommendationScheduleId,
                            JobId = dbResult.Job.RecommendationJobId
                        }).ToList();
            }
            catch(Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}