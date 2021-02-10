export interface TemplateDetails {
    templateName: string,
    templateDescription: string,
    algorithmName: string,
    inputList: Parameter[]
}
export interface Parameter {
    parameterName: string,
    defaultValue?: number | Date,
    parameterValue: null,
    parameterType: string
}