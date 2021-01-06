using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Microsoft.Extensions.Configuration;
using Models.Application.APIModels;
using Newtonsoft.Json;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services.ExternalAPI
{
    public class AssetPFDriveService: PFDriveService, IAssetDriveService
    {
        public AssetPFDriveService(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<PFPortfolio>> GetPortfolios()
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/portfolio";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                    using (HttpResponseMessage res = await client.GetAsync(baseURL))
                    {
                        res.EnsureSuccessStatusCode();
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();
                            List<PFPortfolio> portfolioList = (List<PFPortfolio>)JsonConvert.DeserializeObject((data), typeof(List<PFPortfolio>));
                            return portfolioList;
                        }
                    }
                }
            }
            catch (Exception)
            {
                Error error = new Error
                {
                    Type = ErrorType.API_ERROR,
                    ErrorCode = 400,
                    ErrorMessage = "There was an error fetching the Portfolios with the PF API!"
                };
                throw new GlobalException(error, "Recommendation Engine");
            }
        }

        public async Task<List<PFPortfolio>> GetPlants()
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                    using (HttpResponseMessage res = await client.GetAsync(baseURL))
                    {
                        res.EnsureSuccessStatusCode();
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();
                            List<PFPortfolio> plantList = (List<PFPortfolio>)JsonConvert.DeserializeObject((data), typeof(List<PFPortfolio>));
                            return plantList;
                        }
                    }
                }
            }
            catch (Exception)
            {
                Error error = new Error
                {
                    Type = ErrorType.API_ERROR,
                    ErrorCode = 400,
                    ErrorMessage = "There was an error fetching the Plants with the PF API!"
                };
                throw new GlobalException(error, "Recommendation Engine");
            }
        }

        public async Task<PFPlant> GetPlantById(string plantId)
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant/" + plantId;

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                    using (HttpResponseMessage res = await client.GetAsync(baseURL))
                    {
                        res.EnsureSuccessStatusCode();
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();
                            PFPlant plant = JsonConvert.DeserializeObject<PFPlant>(data);
                            return plant;
                        }
                    }
                }
            }
            catch (Exception)
            {
                Error error = new Error
                {
                    Type = ErrorType.API_ERROR,
                    ErrorCode = 400,
                    ErrorMessage = "There was an error fetching plant ID " + plantId + " with the PF API!"
                };
                throw new GlobalException(error, "Recommendation Engine");

            }
        }
    }
}
