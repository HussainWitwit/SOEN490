//https://k6.io/blog/load-testing-restful-apis-with-k6   refer to this
// You must be 1. Connected to DB and 2.Build , then 
// open terminal in folder and use command: k6 run script.js
import http from 'k6/http';
import { Rate, Trend} from 'k6/metrics';
import { check, sleep } from "k6";


let assetsErrorRate = new Rate('Assets errors');
let AssetsTrend = new Trend('Assets Users');
let configuredRecommendationListErrorRate = new Rate('Configured Recommendation errors');
let ConfiguredRecommendationListTrend = new Trend('Configured Recommendation Users');

//to a threshold of 800ms for POST methods
export let options = {
    thresholds: {
      'Assets Users': ['p(95)<500'],
      'Configured Recommendation Users': ['p(95)<500'],
    },
    //You MAY change these two variables values to test 
    vus: 20, 
    duration: '30s',
  };

export default function () {
  let urlAssets = 'http://localhost:5000/Asset/get';
  let urlConfiguredRecommendationList = 'http://localhost:5000/ConfiguredRecommendation'
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

// Need to add and modify this here for POST METHOD
//   var data = JSON.stringify({
//     name: `Recommendation Name ${__VU}: ${__ITER}`,
//   });

  let requests = {
    'Assets Users': {
      method: 'GET',
      url: urlAssets,
      params: params,
    },
    'Configured Recommendation Users': {
        method: 'GET',
        url: urlConfiguredRecommendationList,
        params: params,
      },
  };
  
  let responses = http.batch(requests);
  let assetsResp = responses['Assets Users'];
  let configuredRecommendationListResp = responses['Configured Recommendation Users'];

  // code 201 for post aka msg: "created"

  check(assetsResp, {
    'status is 200': (r) => r.status === 200,
  }) || assetsErrorRate.add(1);
  AssetsTrend.add(assetsResp.timings.duration);

  check( configuredRecommendationListResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationListErrorRate.add(1);
  ConfiguredRecommendationListTrend.add(configuredRecommendationListResp.timings.duration);

  sleep(1);
}