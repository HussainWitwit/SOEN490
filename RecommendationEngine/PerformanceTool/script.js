//https://k6.io/blog/load-testing-restful-apis-with-k6   refer to this
// You must be 1. Connected to DB and 2.Build , then 
// open terminal in folder and use command: k6 run script.js
import http from 'k6/http';
import { Rate, Trend} from 'k6/metrics';
import { check, sleep } from "k6";


let assetsNestedErrorRate = new Rate('Assets Nested errors');
let AssetsNestedTrend = new Trend('Assets Nested Users');

let assetsErrorRate = new Rate('Assets errors');
let AssetsTrend = new Trend('Assets Users');

let configuredRecommendationListErrorRate = new Rate('Configured Recommendation errors');
let ConfiguredRecommendationListTrend = new Trend('Configured Recommendation Users');

let configuredRecommendationByIdErrorRate = new Rate('Configured Recommendation By Id errors');
let ConfiguredRecommendationByIdTrend = new Trend('Configured Recommendation By Id Users');

let configuredRecommendationAddErrorRate = new Rate('Configured Recommendation Add errors');
let ConfiguredRecommendationAddTrend = new Trend('Configured Recommendation Add Users');

let configuredRecommendationEditErrorRate = new Rate('Configured Recommendation Edit errors');
let ConfiguredRecommendationEditTrend = new Trend('Configured Recommendation Edit Users');

let configuredRecommendationDeleteErrorRate = new Rate('Configured Recommendation Delete errors');
let ConfiguredRecommendationDeleteTrend = new Trend('Configured Recommendation Delete Users');

let convertErrorRate = new Rate('Convert errors');
let ConvertTrend = new Trend('Convert Users');

let recommendationTypeErrorRate = new Rate('Recommendation Type errors');
let RecommendationTypeTrend = new Trend('Recommendation Type Users');


//to a threshold of 800ms for POST methods
export let options = {
    thresholds: {
      'Assets Nested Users': ['p(95)<500'],
      'Assets Users': ['p(95)<500'],
      'Configured Recommendation Users': ['p(95)<500'],
      'Configured Recommendation By Id Users': ['p(95)<500'],
      'Configured Recommendation Add Users': ['p(95)<800'],
      'Configured Recommendation Edit Users': ['p(95)<800'],
      'Configured Recommendation Delete Users': ['p(95)<800'],
      'Convert Users': ['p(95)<500'],
      'Recommendation Type Users': ['p(95)<500'],

    },
    //You MAY change these two variables values to test 
    vus: 20, 
    duration: '30s',
  };

export default function () {
  let urlAssetsNested = 'http://localhost:5000/api/Asset/assetsNested';
  let urlAssets = 'http://localhost:5000/api/Asset';
  let urlConfiguredRecommendationList = 'http://localhost:5000/api/ConfiguredRecommendation';
  let urlConfiguredRecommendationById = 'http://localhost:5000/api/ConfiguredRecommendation/{id}';
  let urlConfiguredRecommendationAdd = 'http://localhost:5000/api/ConfiguredRecommendation'; //verify 
  let urlConfiguredRecommendationEdit = 'http://localhost:5000/api/ConfiguredRecommendation/{id}'; //verify
  let urlConfiguredRecommendationDelete = 'http://localhost:5000/api/ConfiguredRecommendation/{id}'; //verify
  let urlConvert = 'http://localhost:5000/api/Admin/convert';
  let urlRecommendationType = 'http://localhost:5000/api/RecommendationType';

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //body for post request
  let addConfiguredRecommendationData = JSON.stringify({
     name: `Recommendation Name ${__VU}: ${__ITER}`, 
     type: `Recommendation Type ${__VU}: ${__ITER}`,
     recurrenceDayOfWeek: `Recurrence Day Of Week ${__VU}: ${__ITER}`,
     createdOn: `Created On ${__VU}: ${__ITER}`,
     createdBy: `Created By ${__VU}: ${__ITER}`,
     modifiedBy: `Modified By ${__VU}: ${__ITER}`,
     recurrenceDatetime: `Recurrence Datetime ${__VU}: ${__ITER}`,
     granularity: `Granularity ${__VU}: ${__ITER}`,
     preferedScenario: `Prefered Scenario ${__VU}: ${__ITER}`,
     assetIdList: `Asset Id List ${__VU}: ${__ITER}`,
     parameters: `Parameters ${__VU}: ${__ITER}`,
  });
   //body for put request
   let editConfiguredRecommendationData = JSON.stringify({
    name: `Recommendation Name ${__VU}: ${__ITER}`, 
     type: `Recommendation Type ${__VU}: ${__ITER}`,
     recurrenceDayOfWeek: `Recurrence Day Of Week ${__VU}: ${__ITER}`,
     createdOn: `Created On ${__VU}: ${__ITER}`,
     createdBy: `Created By ${__VU}: ${__ITER}`,
     modifiedBy: `Modified By ${__VU}: ${__ITER}`,
     recurrenceDatetime: `Recurrence Datetime ${__VU}: ${__ITER}`,
     granularity: `Granularity ${__VU}: ${__ITER}`,
     preferedScenario: `Prefered Scenario ${__VU}: ${__ITER}`,
     assetIdList: `Asset Id List ${__VU}: ${__ITER}`,
     parameters: `Parameters ${__VU}: ${__ITER}`,
    // Id ??? 
  });
   //body for post request
   let deleteConfiguredRecommendationData = JSON.stringify({
    name: `Recommendation Name ${__VU}: ${__ITER}`, //modify the body as neede
    //just id ????
  });

  let requests = {
    'Assets Nested Users': {
      method: 'GET',
      url: urlAssetsNested,
      params: params,
    },
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
    'Configured Recommendation By Id Users': {
      method: 'GET',
      url: urlConfiguredRecommendationById,
      params: params,
    },
    'Configured Recommendation Add Users': {
      method: 'POST',
      url: urlConfiguredRecommendationAdd,
      params: params,
      body: addConfiguredRecommendationData ,
     },
     'Configured Recommendation Edit Users': {
      method: 'PUT',
      url: urlConfiguredRecommendationEdit,
      params: params,
      body: editConfiguredRecommendationData ,
     },
     'Configured Recommendation Delete Users': {
      method: 'DELETE',
      url: urlConfiguredRecommendationDelete,
      params: params,
      body: deleteConfiguredRecommendationData ,
     },
      'Convert Users': {
        method: 'GET',
        url:  urlConvert,
        params: params,
      },
      'Recommendation Type Users': {
        method: 'GET',
        url:  urlRecommendationType,
        params: params,
      },
  };
  
  let responses = http.batch(requests);
  let assetsNestedResp = responses['Assets Nested Users'];
  let assetsResp = responses['Assets Users'];
  let configuredRecommendationListResp = responses['Configured Recommendation Users'];
  let configuredRecommendationByIdResp = responses['Configured Recommendation By Id Users'];
  let configuredRecommendationAddResp = responses['Configured Recommendation Add Users'];
  let configuredRecommendationEditResp = responses['Configured Recommendation Edit Users'];
  let configuredRecommendationDeleteResp = responses['Configured Recommendation Delete Users'];
  let convertResp = responses['Convert Users'];
  let recommendationTypeResp = responses['Recommendation Type Users'];

  // code 201 for post aka msg: "created"

  check(assetsNestedResp, {
    'status is 200': (r) => r.status === 200,
  }) || assetsNestedErrorRate.add(1);
  AssetsNestedTrend.add(assetsNestedResp.timings.duration);

  check(assetsResp, {
    'status is 200': (r) => r.status === 200,
  }) || assetsErrorRate.add(1);
  AssetsTrend.add(assetsResp.timings.duration);

  check( configuredRecommendationListResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationListErrorRate.add(1);
  ConfiguredRecommendationListTrend.add(configuredRecommendationListResp.timings.duration);

  check( configuredRecommendationByIdResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationByIdErrorRate.add(1);
  ConfiguredRecommendationByIdTrend.add(configuredRecommendationByIdResp.timings.duration);
 
  check( configuredRecommendationAddResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationAddErrorRate.add(1);
  ConfiguredRecommendationAddTrend.add(configuredRecommendationAddResp.timings.duration);

  check( configuredRecommendationEditResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationEditErrorRate.add(1);
  ConfiguredRecommendationEditTrend.add(configuredRecommendationEditResp.timings.duration);

  check( configuredRecommendationDeleteResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationDeleteErrorRate.add(1);
  ConfiguredRecommendationDeleteTrend.add(configuredRecommendationDeleteResp.timings.duration);

  check(convertResp, {
    'status is 200': (r) => r.status === 200,
  }) || convertErrorRate.add(1);
  ConvertTrend.add(convertResp.timings.duration);

  check(recommendationTypeResp, {
    'status is 200': (r) => r.status === 200,
  }) || recommendationTypeErrorRate.add(1);
  RecommendationTypeTrend.add(recommendationTypeResp.timings.duration);

  sleep(1);
}