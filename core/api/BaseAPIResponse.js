// @flow
export type BaseAPIResponse<T> = {
    data? : T,
    error : boolean,
    message : string
}