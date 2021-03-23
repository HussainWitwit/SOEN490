using System;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActionController : ControllerBase
    {
        private readonly IActionService _actionService;

        public ActionController(IActionService actionService)
        {
            _actionService = actionService;
        }

        [HttpGet("{id}")]
        public IActionResult GetActionsByResultId(int id)
        {
            try
            {
                return Ok(_actionService.GetActionsByResultId(id));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("calendar/{assetId?}")]
        public IActionResult GetNbActionsByDay(int? assetId)
        {
            try
            {
                return Ok(_actionService.GetNbActionsByDay(assetId));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("date/{date}")]
        public IActionResult GetActionsByDate(DateTime date)
        {
            try
            {
                return Ok(_actionService.GetActionsByDate(date));
            }
            catch (GlobalException e)
            {
                return e.GetActionResult();
            }
        }
    }
}