using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Microsoft.Extensions.Configuration;
using Models.Application.APIModels;
using Newtonsoft.Json;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services.ExternalAPI
{
    public class MetadataPFDriveService: PFDriveService, IMetadataDriveService
    {
        public MetadataPFDriveService(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<PFMetadata>> GetAssetsMetadataByPlantIds(List<string> plantIds)
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/assets-metadata";
            var plants = new Dictionary<string, List<string>>();
            plants.Add("elementPaths", plantIds);

            string json = JsonConvert.SerializeObject(plants);
            var body = new StringContent(json.ToString(), Encoding.UTF8, "application/json");

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                    using (HttpResponseMessage res = await client.PostAsync(baseURL, body))
                    {
                        res.EnsureSuccessStatusCode();
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();
                            List<PFMetadata> metadataList = (List<PFMetadata>)JsonConvert.DeserializeObject((data), typeof(List<PFMetadata>));
                            return metadataList;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw new DriveApiException();
            }
        }

        public async Task<List<PFPpaPrice>> GetPPAPriceByPlantId(string plantId)
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant-ppa-prices/" + plantId;

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
                            List<PFPpaPrice> ppaList = (List<PFPpaPrice>)JsonConvert.DeserializeObject((data), typeof(List<PFPpaPrice>));
                            return ppaList;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw new DriveApiException();
            }
        }

        public async Task<Dictionary<string, List<PFPredictedEnergy>>> GetDailyPredictedEnergyByPlantIds(DateTime startTime, DateTime endTime, List<string> plantIds)
        {
            string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/data";

            var attributes = new List<string>();
            attributes.Add("ENERGY.MODEL");

            var body = new Dictionary<string, dynamic>();

            body.Add("startTime", startTime.ToString("yyyy-MM-dd"));
            body.Add("endTime", endTime.ToString("yyyy-MM-dd"));
            body.Add("resolution", "day");
            body.Add("attributes", attributes);
            body.Add("ids", plantIds);

            string json = JsonConvert.SerializeObject(body);
            var jsonBody = new StringContent(json.ToString(), Encoding.UTF8, "application/json");

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                    using (HttpResponseMessage res = await client.PostAsync(baseURL, jsonBody))
                    {
                        res.EnsureSuccessStatusCode();
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();
                            Dictionary<string, List<PFPredictedEnergy>> predictedEnergyList = (Dictionary<string, List<PFPredictedEnergy>>)JsonConvert.DeserializeObject((data), typeof(Dictionary<string, List<PFPredictedEnergy>>));
                            return predictedEnergyList;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw new DriveApiException();
            }

        }
    }
}