//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
export type Asset = {
    id: number,
    name: string,
    displayText: string,
    EnergyType: string,
    TimeZone: string,
    ElementPath: string,
    AcPower: string,
    children: Asset[]
}
