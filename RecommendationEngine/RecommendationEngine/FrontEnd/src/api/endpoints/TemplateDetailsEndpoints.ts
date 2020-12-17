import { TemplateDetails } from "../models/TemplateDetails";

export const getTemplateDetailsInfo = async () => {

    let templates: TemplateDetails[];

    try{
        let response = await fetch ('');

        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            templates  = AssignResponse(jsonResponse);
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

const AssignResponse = function(response: any): TemplateDetails[] { 

let result = response.map((obj: any) => {
    return {
        templateName : obj.templateName,
        templateDescription: obj.templateDescription,
        algorithmName: obj.algorithmName,
        inputList: obj.inputList ? obj.inputList.map((input: any) => {
            return {
                parameterName : input.parameterName
            }
        }) : [] 
        };
})
return result;
}  