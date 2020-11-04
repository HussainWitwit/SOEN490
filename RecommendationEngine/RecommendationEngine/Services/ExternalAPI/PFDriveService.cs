using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace RecommendationEngine.Services.ExternalAPI {
        public class PFDriveService : IDriveService {
                private IConfiguration _configuration;
                private string _driveAPIKey = null;

                public PFDriveService(IConfiguration configuration) {
                        _configuration = configuration;
                        _driveAPIKey = _configuration["DriveAPIKey"];
                }

                public async Task<string> GetPortfolios() {
                        string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/portfolio";

                        try {
                                using (HttpClient client = new HttpClient()) {
                                        client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                                        using (HttpResponseMessage res = await client.GetAsync(baseURL)) {
                                                res.EnsureSuccessStatusCode();
                                                using (HttpContent content = res.Content) {
                                                        var data = await content.ReadAsStringAsync();
                                                        return data;
                                                }
                                        }
                                }
                        }
                        catch (Exception e) {
                                //Change this to global exception
                                Console.WriteLine("There was an error with the PF API!");
                        }

                        return null;
                }

                public async Task<string> GetPlants() {
                        string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant";

                        try {
                                using (HttpClient client = new HttpClient()) {
                                        client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                                        using (HttpResponseMessage res = await client.GetAsync(baseURL)) {
                                                res.EnsureSuccessStatusCode();
                                                using (HttpContent content = res.Content) {
                                                        var data = await content.ReadAsStringAsync();
                                                        return data;
                                                }
                                        }
                                }
                        }
                        catch (Exception e) {
                                //Change this to global exception
                                Console.WriteLine("There was an error with the PF API!");
                        }

                        return null;
                }

                public async void GetPlantByPortfolioId(string portfolioId) {
                        string baseURL = "https://drive-dev-apim01.azure-api.net/renew01/v2/plant/" + portfolioId;

                        try {
                                using (HttpClient client = new HttpClient()) {
                                        client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _driveAPIKey);
                                        using (HttpResponseMessage res = await client.GetAsync(baseURL)) {
                                                res.EnsureSuccessStatusCode();
                                                using (HttpContent content = res.Content) {
                                                        var data = await content.ReadAsStringAsync();
                                                        Console.WriteLine(data);
                                                }
                                        }
                                }
                        }
                        catch (Exception e) {
                                //Change this to global exception
                                Console.WriteLine("There was an error with the PF API!");
                        }

                }
        }
}
