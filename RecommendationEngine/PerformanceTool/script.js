//https://k6.io/blog/load-testing-restful-apis-with-k6   refer to this
// You must be 1. Connected to DB and 2.Build , then 
// open terminal in folder and use command: k6 run script.js

/**
 * To make it work, replace the dump file on the mysql-dump folder by the sql dump file on the PerformanceTool folder
 * Then run the docker-compose up command on the directory to start an isolated fresh instance of the project on port 5000
 */
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

let recommendationTypeErrorRate = new Rate('Recommendation Type errors');
let RecommendationTypeTrend = new Trend('Recommendation Type Users');

let actionByIdErrorRate = new Rate('Action By Id errors');
let ActionByIdTrend = new Trend('Action By Id Users');

let jobErrorRate = new Rate('Job errors');
let JobTrend = new Trend('Job Users');

let jobLogsErrorRate = new Rate('Job Logs errors'); 
let JobLogsTrend = new Trend('Job Logs Users');

let resultErrorRate = new Rate('Result errors');
let ResultTrend = new Trend('Result Users');

let schedulerEditErrorRate = new Rate('Scheduler errors');
let SchedulerEditTrend = new Trend('Scheduler Users');

export let options = {
  scenarios: {
    postRequests: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 25,
      maxDuration: '35s',
      exec: 'postRequests',
      startTime: '0s'
    },
    schedulerRequests: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 25,
      maxDuration: '35s',
      exec: 'schedulerRequests',
      startTime: '35s'
    },
    getRequests: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 25,
      maxDuration: '50s',
      exec: 'getRequests',
      startTime: '100s'
    },
    putRequests: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 25,
      maxDuration: '40s',
      exec: 'putRequests',
      startTime: '150s'
    },
    deleteRequests: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 25,
      maxDuration: '50s',
      exec: 'deleteRequests',
      startTime: '190s'
    },
  },
    thresholds: {
      'Assets Nested Users': ['p(95)<1000'],
      'Assets Users': ['p(95)<1000'],
      'Configured Recommendation Users': ['p(95)<3000'],
      'Configured Recommendation By Id Users': ['p(95)<1000'],
      'Configured Recommendation Add Users': ['p(95)<500'],
      'Configured Recommendation Edit Users': ['p(95)<500'],
      'Configured Recommendation Delete Users': ['p(95)<300'],
      'Recommendation Type Users': ['p(95)<1000'],
      'Action By Id Users': ['p(95)<500'],
      'Job Users': ['p(95)<800'],
      'Job Logs Users': ['p(95)<800'],
      'Result Edit Users': ['p(95)<500'],
      'Scheduler Edit Users': ['p(95)<100'], //threshold might be too high
    },
  };

export function postRequests() {
  let urlConfiguredRecommendationAdd = 'http://localhost:5000/api/ConfiguredRecommendation'; 

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //body for post request
  let addConfiguredRecommendationData = JSON.stringify({
     name: `Recommendation Name ${__VU}: ${__ITER}`, 
     type: `Yearly Wash Optimization`,
     recurrenceDayOfWeek: 1,
     createdOn: `2021-12-10T00:00:00`,
     createdBy: `Created By ${__VU}: ${__ITER}`,
     modifiedBy: `Modified By ${__VU}: ${__ITER}`,
     recurrenceDatetime: `2023-12-10T00:00:00`,
     granularity: `Yearly`,
     preferedScenario: `ROI`,
     assetIdList: [33, 44],
     /*parameters: [{"ParameterName": "SpanIncrement", "ParameterValue": "3"},
     {"ParameterName": "CenterPointIncrement", "ParameterValue": "3"},
     {"ParameterName": "Accelerator", "ParameterValue": "0.35"},
     {"ParameterName": "SoilingSeasonBuffer", "ParameterValue": "3"}],*/
  });

  let requests = {
    'Configured Recommendation Add Users': {
      method: 'POST',
      url: urlConfiguredRecommendationAdd,
      params: params,
      body: addConfiguredRecommendationData ,
    }
  };
  
  let responses = http.batch(requests);
  let configuredRecommendationAddResp = responses['Configured Recommendation Add Users'];

  check( configuredRecommendationAddResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationAddErrorRate.add(1);
  ConfiguredRecommendationAddTrend.add(configuredRecommendationAddResp.timings.duration);

  sleep(1);
}

export function schedulerRequests(){
  let urlSchedulerEdit = `http://localhost:5000/api/scheduler/${((__VU-1)%20 )*25+__ITER%25 + 1}`;
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let requests = {
  
    'Scheduler Edit Users': {
      method: 'PUT',
      url: urlSchedulerEdit,
      params: params,
    },
  };

  let responses = http.batch(requests);
  let schedulerEditResp = responses['Scheduler Edit Users'];
  
  check( schedulerEditResp, {
    'status is 200': (r) => r.status === 200,
  }) || schedulerEditErrorRate.add(1);
  SchedulerEditTrend.add(schedulerEditResp.timings.duration);
 sleep(1);
}

export function putRequests() {
  let urlConfiguredRecommendationEdit = `http://localhost:5000/api/ConfiguredRecommendation/${((__VU-1)%20 )*25+__ITER%25 + 1}`;

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

   //body for put request
   let editConfiguredRecommendationData = JSON.stringify({
     name: `Edited Recommendation Name ${__VU}: ${__ITER}`, 
     type: `Yearly Wash Optimization`,
     recurrenceDayOfWeek: 4,
     createdOn: `2022-12-10T00:00:00`,
     createdBy: `Created By ${__VU}: ${__ITER}`,
     modifiedBy: `Modified By ${__VU}: ${__ITER}`,
     recurrenceDatetime: `2022-12-13T00:00:00`,
     granularity: `Yearly`,
     preferedScenario: `netSaving`,
     assetIdList: [33, 44],
     /*parameters: [{"ParameterName": "SpanIncrement", "ParameterValue": "3"},
     {"ParameterName": "CenterPointIncrement", "ParameterValue": "3"},
     {"ParameterName": "Accelerator", "ParameterValue": "0.35"},
     {"ParameterName": "SoilingSeasonBuffer", "ParameterValue": "3"}],*/
  });

  let requests = {
     'Configured Recommendation Edit Users': {
      method: 'PUT',
      url: urlConfiguredRecommendationEdit,
      params: params,
      body: editConfiguredRecommendationData ,
    },
  };
  
  let responses = http.batch(requests);
  let configuredRecommendationEditResp = responses['Configured Recommendation Edit Users'];
  
  check( configuredRecommendationEditResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationEditErrorRate.add(1);
  ConfiguredRecommendationEditTrend.add(configuredRecommendationEditResp.timings.duration);
 
  sleep(1);
}
export function getRequests() {
  let urlAssetsNested = 'http://localhost:5000/api/Asset/nested';
  let urlAssets = 'http://localhost:5000/api/Asset';
  let urlConfiguredRecommendationList = 'http://localhost:5000/api/ConfiguredRecommendation';
  let urlConfiguredRecommendationById = `http://localhost:5000/api/ConfiguredRecommendation/10`;
  let urlRecommendationType = 'http://localhost:5000/api/RecommendationType';
  let urlActionById = `http://localhost:5000/api/Action/15`;
  let urlJob = `http://localhost:5000/api/Job`;
  let urlJobLogs = `http://localhost:5000/api/Job/log/1`;
  let urlResult = `http://localhost:5000/api/Result`; 

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

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
    'Recommendation Type Users': {
      method: 'GET',
      url:  urlRecommendationType,
      params: params,
    },
    /*'Action By Id Users': {
      method: 'GET',
      url:  urlActionById,
      params: params,
    },*/
    'Job Users': {
      method: 'GET',
      url:  urlJob,
      params: params,
    },
    'Job Logs Users': {
      method: 'GET',
      url:  urlJobLogs,
      params: params,
    },
    /*'Result Users': {
      method: 'GET',
      url:  urlResult,
      params: params,
    },*/
  };
  
  let responses = http.batch(requests);
  let assetsNestedResp = responses['Assets Nested Users'];
  let assetsResp = responses['Assets Users'];
  let configuredRecommendationListResp = responses['Configured Recommendation Users'];
  let configuredRecommendationByIdResp = responses['Configured Recommendation By Id Users'];
  let recommendationTypeResp = responses['Recommendation Type Users'];
  //let actionByIdResp = responses['Action By Id Users'];
  let jobResp = responses['Job Users'];
  let jobLogsResp = responses['Job Logs Users'];
  //let resultResp = responses['Result Users'];


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

  check(recommendationTypeResp, {
    'status is 200': (r) => r.status === 200,
  }) || recommendationTypeErrorRate.add(1);
  RecommendationTypeTrend.add(recommendationTypeResp.timings.duration);

  /*check(actionByIdResp, {
    'status is 200': (r) => r.status === 200,
  }) || actionByIdErrorRate.add(1);
  ActionByIdTrend.add(actionByIdResp.timings.duration);*/

  check(jobResp, {
    'status is 200': (r) => r.status === 200,
  }) || jobErrorRate.add(1);
  JobTrend.add(jobResp.timings.duration);
  
  check(jobLogsResp, {
    'status is 200': (r) => r.status === 200,
  }) || jobLogsErrorRate.add(1);
  JobLogsTrend.add(jobLogsResp.timings.duration);
  
  /*check(resultResp, {
    'status is 200': (r) => r.status === 200,
  }) || resultErrorRate.add(1);
  ResultTrend.add(resultResp.timings.duration);*/

  sleep(1);
}
export function deleteRequests() {
  let urlConfiguredRecommendationDelete =  `http://localhost:5000/api/ConfiguredRecommendation/${(__VU-1)*25+__ITER-49}`;

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let requests = {
     'Configured Recommendation Delete Users': {
      method: 'DELETE',
      url: urlConfiguredRecommendationDelete,
      params: params,
    },
  };
  
  let responses = http.batch(requests);
  let configuredRecommendationDeleteResp = responses['Configured Recommendation Delete Users'];
  
  check( configuredRecommendationDeleteResp, {
    'status is 200': (r) => r.status === 200,
  }) || configuredRecommendationDeleteErrorRate.add(1);
  ConfiguredRecommendationDeleteTrend.add(configuredRecommendationDeleteResp.timings.duration);

  sleep(1);
}