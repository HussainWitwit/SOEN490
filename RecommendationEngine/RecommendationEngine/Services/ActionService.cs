﻿using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.Application.Asset;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using Action = Models.Application.Action;

namespace RecommendationEngine.Services
{
    public class ActionService : IActionService
    {
        private IActionRepository _actionRepository;
        private IResultRepository _resultRepository;

        public ActionService(IActionRepository actionRepository, IResultRepository resultRepository)
        {
            _actionRepository = actionRepository;
            _resultRepository = resultRepository;
        }

        public ActionGrouping GetActionsByResultId(int id)
        {
            try
            {
                List<DBAction> dbActions = _actionRepository.GetActionsByResultId(id).ToList();

                List<Action> actionList = dbActions.Select(action => new Action
                    {
                        Id = action.ActionId,
                        DisplayText = action.DisplayText,
                        Title = action.Title,
                        recommendedDate = action.RecommendationJobResult.Job.Timestamp

                     }).ToList();

                DBRecommendationSchedule schedule = dbActions.First().RecommendationJobResult.Job.Schedule;

                if(schedule ==  null)
                {
                    throw new GlobalException
                    {
                        ApplicationName = "Recommendation Engine",
                        Code = 204,
                        ErrorMessage = "Actions are not linked to a configured recommendation",
                        Type = "No Content"
                    };
                }

                ActionGrouping actions = new ActionGrouping
                {
                    RecommendationName = schedule.Name,
                    AssetNameList = schedule.AssetsList.Select(asset => asset.Asset.Name).ToList(),
                    Actions = actionList
                };

                return actions;

            }
            catch (GlobalException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                throw new GlobalException(StatusCodes.Status500InternalServerError, "Internal Server Error", e.Message, "Recommendation Engine");
            }
        }
    }
}
