

export interface ConfiguredRecommendationJob {
    id: number,
    duration: number,
    configuredRecommendationId: number,
    configuredRecommendationTitle: string,
    status: string,
    assetName: string,
    timestamp: Date;
}

export interface JobLog{
    id: number,
    time: Date,
    level: string,
    description: string;
}