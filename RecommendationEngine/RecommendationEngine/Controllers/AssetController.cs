﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetController : ControllerBase
    {
        private IAssetService _assetService;

        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet("get")]
        public IActionResult GetAssets()
        {
            return Ok(_assetService.GetAssetsTreeview());
        }

        [HttpGet("convert")]
        public async Task<IActionResult> ConvertAsync()
        {
            try
            {
                await _assetService.Convert();
                return Ok();
            }
            catch (GlobalException e){
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
            
        }
    }
}