export interface TemplateDetails {
    templateName: string,
    templateDescription: string,
    algorithmName: string,
    inputList: Parameter[]
}
export interface Parameter {
    parameterName: string,
    defaultValue: string,
    parameterValue: string,
    parameterType: string,
    displayText: string,
}