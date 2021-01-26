export interface Action {
    id: number,
    title: string,
    displayText: string,
    resultTimestamp: string,
    configuredRecommendationId: number,
    resultId: number,
    timestamp: Date
}