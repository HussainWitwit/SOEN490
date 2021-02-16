import { Parameter, TemplateDetails } from "../models/TemplateDetails";

export async function GetTemplateDetailsInfo() : Promise<TemplateDetails[]> {
    let templates: TemplateDetails[] = [];
    try{
        let response = await fetch ('api/RecommendationType');
        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            templates = jsonResponse;
            templates.forEach(function(template) {
                template.inputList.forEach(function(param) {
                    param.parameterValue = param.defaultValue;
                })
            })
            return templates;
        }
    }
    catch (error){
        console.log("Error while fetchting recommendation types.")
        console.log(error);
    }
    return templates;
}