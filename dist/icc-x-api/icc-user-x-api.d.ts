import { IccUserApi } from "../icc-api/api/IccUserApi"
export declare class IccUserXApi extends IccUserApi {
  fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  static api(
    host: string,
    username: string,
    password: string,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  ): IccUserXApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
}
