//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
export interface ConfiguredRecommendation {
    name: string,
    type: string,
    granularity: string,
    createdBy: string,
    recurrenceDayOfWeek: number,
    recurrenceDatetime: string,
    createdOn: string,
    parameters: ConfiguredRecommendationParameter[]
    
}

export interface ConfiguredRecommendationParameter {
    parameterName: string,
    parameterValue: string
}