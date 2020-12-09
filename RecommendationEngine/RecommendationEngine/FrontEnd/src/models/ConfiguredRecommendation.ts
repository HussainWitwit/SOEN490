//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
import { Asset } from './Asset';
export interface ConfiguredRecommendation {
    name: string,
    type: string,
    granularity: string,
    createdBy: string,
    preferredScenario: string,
    recurrenceDayOfWeek: number,
    recurrenceDatetime: string,
    createdOn: string,
    assetIdList?: number[],
    assetList?: Asset[],
    parameters?: ConfiguredRecommendationParameter[]
    
}

export interface ConfiguredRecommendationParameter {
    parameterName: string,
    parameterValue: string
}