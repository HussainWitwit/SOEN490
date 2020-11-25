import { ConfiguredRecommendation } from "../../entities/ConfiguredRecommendation";
//TODO: unit test the fetch method (jest)
//TODO: Integration test as well
export const getAllConfiguredRecommendations = async () => {
    let configuredRecommendations: ConfiguredRecommendation[];
    try{
        let response = await fetch ('ConfiguredRecommendation/get');
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