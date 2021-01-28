export interface ErrorList {
    appName: string,
    errorList: Error[]
}

export interface Error {
    code: number,
    message: string,
    type: string
}