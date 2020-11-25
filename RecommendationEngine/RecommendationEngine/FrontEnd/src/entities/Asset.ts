//You have to make sure that the method that fetches this object
//have exactly this attribute, or it will break and it will be hard to debug.
export interface Asset {
    Id: number,
    Name: string,
    DisplayText: string,
    EnergyType: string,
    TimeZone: string,
    ElementPath: string,
    AcPower: string,
    Children: Asset[]
}
