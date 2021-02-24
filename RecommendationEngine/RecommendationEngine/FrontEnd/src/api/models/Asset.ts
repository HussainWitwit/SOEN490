//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
export interface Asset {
    id: number,
    name: string,
    displayText: string,
    energyType: string,
    timeZone: string,
    elementPath: string,
    acPower: string,
    children: Asset[],
    assetType: string
}

export interface MultiSelectTreeViewAsset {
    key: number,
    title: string,
    value: Asset,
    children: MultiSelectTreeViewAsset[],
}