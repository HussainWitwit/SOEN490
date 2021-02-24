//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
import { Asset } from './Asset';
import { Parameter } from './TemplateDetails';
export interface ConfiguredRecommendation {
    id: number,
    name: string,
    type: string,
    description: string,
    granularity: string,
    createdBy: string,
    preferredScenario: string,
    recurrenceDayOfWeek: number,
    recurrenceDatetime: string,
    createdOn: string,
    lastJobs: Job[],
    assetIdList?: number[],
    assetList?: Asset[],
    parameters?: Parameter[]
}
export interface Job {
    id: number,
    status: string
    timestamp: Date
}