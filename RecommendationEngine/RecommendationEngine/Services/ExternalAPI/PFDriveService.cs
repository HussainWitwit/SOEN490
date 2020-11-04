using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngine.Services.ExternalAPI
{
    public class PFDriveService: IDriveService
    {
        //private IDriveService _driveService;

        public PFDriveService()
        {
            //_driveService = driveService;
        }

        public async Task<List<PFPortfolio>> GetPortfolios() {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/portfolio";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");
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
            catch (Exception e) {
                //Change this to global exception
                Console.WriteLine(e.Message);
                Console.WriteLine("There was an error with the PF API!");
            }

            return null;
        }

        public async Task<List<PFPortfolio>> GetPlants()
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");
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
                //Change this to global exception
                Console.WriteLine("There was an error with the PF API!");
            }

            return null;
        }

        public async Task<PFPlant> GetPlantByPortfolioId(string portfolioId)
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant/" + portfolioId;

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");
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
                //Change this to global exception
                Console.WriteLine("There was an error with the PF API!");
            }
            return null;
        }
    }
}
