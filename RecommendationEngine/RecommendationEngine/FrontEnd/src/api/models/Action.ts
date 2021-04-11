export interface Action {
    id: number,
    title: string,
    displayText: string,
    recommendedOnDate: Date,
    recommendedDate: Date
}
export interface ActionGrouping {
    recommendationName: string,
    assetNameList: string[],
    actions: Action[],
    configuredRecommendationId: number
}