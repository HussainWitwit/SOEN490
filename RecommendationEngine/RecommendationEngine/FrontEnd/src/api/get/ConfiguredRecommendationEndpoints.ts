import { ConfiguredRecommendation } from "../../entities/ConfiguredRecommendation";
//TODO: unit test the fetch method (jest)
//TODO: Integration test as well


export const GetConfiguredRecommendationList = async () => {

    let configuredRecommendations: ConfiguredRecommendation[];
    try{
        let response = await fetch ('ConfiguredRecommendation/get');
        // let response = await fetch(endpoint);
        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            configuredRecommendations = AssignResponse(jsonResponse);
            return configuredRecommendations;
        }
        else{
            return [];
        }
    }
    catch(error) {
        return [];
    }
}

  //FIXME: Syntax Errror here
  export const PostConfiguredRecommendation = async (recommendation: ConfiguredRecommendation) => {
    fetch('http://localhost:5000/ConfiguredRecommendation/add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommendation)
    })
      .then((response) => response.json())
      .then((data) => ({ postResultId: data.id }));
  };



// export const ConfigureRecommendationPost = async (endpoint: string, object = {}) => {

// }

// ConfigureClient.get = (endpoint:string, customConfig = {}) => {
//     return ConfiguredRecommendationClient(endpoint);
// }

// ConfigureClient.post = (endpoint:string, customConfig = {}) => {
//     return ConfigureRecommendationPost(endpoint, customConfig);
// }

/**
 * 
 * @param {*} response 
 */
const AssignResponse = function(response: any): ConfiguredRecommendation[] {
    //Make sure the returned value is exactly equal to entity attribute for the entity in question
    let result =  response.map((element: any) => {
        return {
            name: element.name,
            type: element.type,
            granularity: element.granularity,
            createdBy: element.createdBy,
            recurrenceDayOfWeek: element.recurrenceDayOfWeek,
            recurrenceDatetime: element.recurrenceDatetime,
            createdOn: element.createdOn,
            assetList: element.assetList,
            parameters : element.parameters ? element.parameters.map((parameter: any) => {
                return { 
                  parameterName: parameter.parameterName,
                  parameterValue: parameter.parameterValue,
                }  
            })  : []
          };
    })
    return result;
    
}