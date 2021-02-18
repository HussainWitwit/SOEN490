
export interface ConfiguredRecommendationResult {
    id: string,
    configuredRecommendationId: number,
    configuredRecommendationTitle: string,
    assetName: string,
    resultOutputDate: Date,
    netSaving: number,
    returnOnInvestment: number,
    costOfAction: number,
    costOfInaction: number
}