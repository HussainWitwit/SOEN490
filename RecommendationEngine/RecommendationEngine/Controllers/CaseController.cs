using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CaseController : ControllerBase
    {
        private CaseService _caseService;

        public CaseController(CaseService caseService)
        {
            _caseService = caseService;
        }
    }
}
