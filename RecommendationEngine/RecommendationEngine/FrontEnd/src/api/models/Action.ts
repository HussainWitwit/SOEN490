export interface Action {
    id: number,
    title: string,
    displayText: string,
    recommendedOnDate: Date
}
export interface ActionGrouping {
    recommendationName: string,
    assetNameList: String[],
    actions: Action[]
}