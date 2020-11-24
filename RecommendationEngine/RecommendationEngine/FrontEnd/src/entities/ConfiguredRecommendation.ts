//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
export type ConfiguredRecommendation = {
    Name: string,
    Type: string,
    Granularity: string,
    CreatedBy: string,
    RecurrenceDayOfWeek: number,
    RecurrenceDatetime: string,
    CreatedOn: string,
    Parameters: ConfiguredRecommendationParameter[]
    
}

export type ConfiguredRecommendationParameter = {
    ParameterName: string,
    ParameterValue: string
}