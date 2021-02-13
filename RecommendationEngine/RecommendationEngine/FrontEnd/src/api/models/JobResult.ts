
export interface ConfiguredRecommendationResult {
    id: string,
    configuredRecommendationId: number,
    configuredRecommendationTitle: string,
    netSaving: number,
    returnOnInvestment: number,
    costOfAction: number,
    costOfInaction: number,
    assetName: string,
    resultOutputDate: Date
}