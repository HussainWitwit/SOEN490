export interface TemplateDetails {
    templateName: string,
    templateDescription: string,
    algorithmName: string,
    inputList: Parameter[]
}
export interface Parameter {
    parameterName: string,
    parameterType: string,
    defaultValue?: number,
    parameterValue: null
}