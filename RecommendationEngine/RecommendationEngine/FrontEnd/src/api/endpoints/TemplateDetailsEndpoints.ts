import { TemplateDetails } from "../models/TemplateDetails";

export const GetTemplateDetailsInfo = async () => {

    let templates: TemplateDetails[];

    try{
        let response = await fetch ('api/RecommendationType');

        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            templates  = setResponse(jsonResponse);
            return templates;
        }
        else{
            return [];
        }
    }
    catch (error){
        return [];
    }
}

const setResponse = function(response: any): TemplateDetails[] { 

let result = response.map((obj: any) => {
    return {
        templateName : obj.templateName,
        templateDescription: obj.templateDescription,
        algorithmName: obj.algorithmName,
        inputList: obj.inputList ? obj.inputList.map((input: any) => {
            return {
                parameterName : input.parameterName,
                defaultValue: input.defaultValue
            }
        }) : [] 
        };
})
return result;
}  