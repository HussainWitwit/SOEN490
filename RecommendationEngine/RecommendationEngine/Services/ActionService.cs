using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Utilities;
using Action = Models.Application.Action;

namespace RecommendationEngine.Services
{
    public class ActionService : IActionService
    {
        private IActionRepository _actionRepository;
        private IAssetRepository _assetRepository;

        public ActionService(IActionRepository actionRepository, IAssetRepository assetRepository)
        {
            _actionRepository = actionRepository;
            _assetRepository = assetRepository;
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
                        recommendedDate = action.Date,
                        recommendedOnDate = action.RecommendationJobResult.Job.Timestamp

                     }).ToList();

                DBRecommendationJob job = dbActions.First().RecommendationJobResult.Job;
                DBRecommendationSchedule schedule = job.Schedule;


                if (schedule ==  null)
                {
                    Error error = new Error
                    {
                        Type = ErrorType.BAD_REQUEST,
                        ErrorMessage = "Actions are not linked to a configured recommendation"
                    };
                    throw new RequestValidationException(error, "RecommendationEngine");
                }

                ActionGrouping actions = new ActionGrouping
                {
                    ConfiguredRecommendationId = schedule.RecommendationScheduleId,
                    RecommendationName = schedule.Name,
                    AssetNameList = new List<string> { job.Asset.DisplayText },
                    Actions = actionList
                };

                return actions;

            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        public List<Action> GetActionsByDate(DateTime date)
        {
            try
            {
                List<DBAction> dbActions = _actionRepository.GetActionsByDate(date).ToList();

                List<Action> actions = dbActions.Select(action => new Action
                {
                    Id = action.ActionId,
                    NetSaving = action.RecommendationJobResult.NetSaving,
                    ReturnOnInvestment = action.RecommendationJobResult.ReturnOnInvestment,
                    AssetName = action.Asset.DisplayText,
                    RecommendationName = action.RecommendationJobResult.Job.Schedule.Name,
                    DisplayText = action.DisplayText,
                    Title = action.Title,
                    recommendedDate = action.Date,
                    recommendedOnDate = action.RecommendationJobResult.Job.Timestamp

                }).ToList();

                return actions;

            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }

        }

        public List<Action> GetActionsByCompoundId(string id)
        {
            try
            {
                List<DBAction> dbActions = _actionRepository.GetActionsByIdList(id.Split(".").Select(int.Parse).ToList()).ToList();

                return dbActions.Select(action => new Action
                {
                    Id = action.ActionId,
                    NetSaving = action.RecommendationJobResult.NetSaving,
                    ReturnOnInvestment = action.RecommendationJobResult.ReturnOnInvestment,
                    AssetName = action.Asset.DisplayText,
                    RecommendationName = action.RecommendationJobResult.Job.Schedule.Name,
                    DisplayText = action.DisplayText,
                    Title = action.Title,
                    recommendedDate = action.Date,
                    recommendedOnDate = action.RecommendationJobResult.Job.Timestamp

                }).ToList();
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        public List<CalendarAction> GetNbActionsByDay(int? assetId)
        {
            try
            {
                var actionsList = _actionRepository.GetActionList();

                if (assetId != null)
                {
                    var assetsList = _assetRepository.GetAssetsList();
                    var activeActionsList = actionsList
                        .Where(result => result.Asset.IsChildOrEquivalent((int)assetId, assetsList));
                    var inactiveActionsList = actionsList.Except(activeActionsList);

                    return GroupCalendarActions(activeActionsList).Union(GroupCalendarActions(inactiveActionsList, "Inactive")).OrderBy(x => x.Date).ToList();
                }

                return GroupCalendarActions(actionsList).OrderBy(x => x.Date).ToList();

            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        public IEnumerable<CalendarAction> GroupCalendarActions(IEnumerable<DBAction> actions, string status="Active")
        {
            return actions.GroupBy(action => action.Date)
                .Select(grp => new CalendarAction
                {
                    Date = grp.Key,
                    NbOfActions = grp.Count(),
                    Status = status,
                    Id = string.Join(".", grp.Select(x=>x.ActionId))
        });
        }
    }
}
