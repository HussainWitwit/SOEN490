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
            // return formatResponse(jsonResponse); //change the name to FetchResponse
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
            Name: element.name,
            Type: element.type,
            Granularity: element.granularity,
            CreatedBy: element.createdBy,
            RecurrenceDayOfWeek: element.recurrenceDayOfWeek,
            RecurrenceDatetime: element.recurrenceDatetime,
            CreatedOn: element.createdOn,
            Parameters : element.parameters ? element.parameters.map((parameter: any) => {
                return { 
                  ParameterName: parameter.parameterName,
                  ParameterValue: parameter.parameterValue,
                }  
            })  : []
          };
    })
    return result;
    
}