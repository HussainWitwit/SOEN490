using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Interfaces.Services.ExternalAPI;
using Models.Application.APIModels;

namespace RecommendationEngine.Services.ExternalAPI
{
    public class PFDriveService : IDriveService
    {
        private IConfiguration _configuration;
        private string _driveAPIKey = null;

        public PFDriveService(IConfiguration configuration)
        {
            _configuration = configuration;
            _driveAPIKey = _configuration["DriveAPIKey"];
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
            catch (Exception e)
            {
                throw new GlobalException(400, "Bad Request", "There was an error with the PF API!", "Recommendation Engine");

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
                            List<PFPortfolio> portfolioList = (List<PFPortfolio>)JsonConvert.DeserializeObject((data), typeof(List<PFPortfolio>));
                            return portfolioList;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw new GlobalException(400, "Bad Request", "There was an error with the PF API!", "Recommendation Engine");

            }
        }

        public async Task<PFPlant> GetPlantByPortfolioId(string portfolioId)
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant/" + portfolioId;

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
            catch (Exception e)
            {
                throw new GlobalException(400, "Bad Request", "There was an error with the PF API!", "Recommendation Engine");

            }
        }


        public double GetPredictedEnergy()
        {
            return 240;
        }

        public double GetEnergyPrice()
        {
            return 0.1;
        }

        public double GetDCCapacity()
        {
            return 25;
        }
    }
}
 