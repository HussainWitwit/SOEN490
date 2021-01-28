

export interface ConfiguredRecommendationJob {
    id: number,
    duration: number,
    configuredRecommendationId: number,
    status: string,
    timestamp: Date;
}

export interface JobLog{
    id: number,
    time: Date,
    level: string,
    description: string;
}