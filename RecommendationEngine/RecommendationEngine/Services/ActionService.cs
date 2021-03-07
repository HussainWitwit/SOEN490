using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using Action = Models.Application.Action;

namespace RecommendationEngine.Services
{
    public class ActionService : IActionService
    {
        private IActionRepository _actionRepository;

        public ActionService(IActionRepository actionRepository)
        {
            _actionRepository = actionRepository;
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

        public List<CalendarAction> GetNbActionsByDay()
        {
            try
            {
                return _actionRepository.GetActionList().GroupBy(action => action.Date)
                                        .Select(grp => new CalendarAction
                                        {
                                            Date = grp.Key,
                                            NbOfActions = grp.Count()
                                        }).OrderBy(x => x.Date).ToList();

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
    }
}
