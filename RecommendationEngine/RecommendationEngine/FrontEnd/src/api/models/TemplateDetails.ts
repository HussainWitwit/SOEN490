export interface TemplateDetails {
    templateName: string,
    templateDescription: string,
    algorithmName: string,
    inputList: TemplateDetailsInput []
}

export interface TemplateDetailsInput {
    parameterName: string,
    defaultValue: number
}