using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;

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
                List<DBRecommendationJobResult> dbResults = _resultRepository.GetResultList();

                List<Result> results = new List<Result>();

                foreach (DBRecommendationJobResult dbResult in dbResults)
                {
                    results.Add(
                        new Result
                        {
                            Id = dbResult.RecommendationJobResultId,
                            CostOfAction = dbResult.CostOfAction,
                            CostOfInaction = dbResult.CostOfInaction,
                            NetSaving = dbResult.NetSaving,
                            ReturnOnInvestment = dbResult.ReturnOnInvestment,
                            ConfiguredRecommendationId = dbResult.Job.Schedule.RecommendationScheduleId,
                            JobId = dbResult.Job.RecommendationJobId
                        });
                }
                return results;
            }
            catch(Exception e)
            {
                throw new GlobalException(StatusCodes.Status500InternalServerError, "Internal Server Error", e.Message, "Recommendation Engine");
            }
        }
    }
}