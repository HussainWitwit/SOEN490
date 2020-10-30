using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.CaseServices;

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
