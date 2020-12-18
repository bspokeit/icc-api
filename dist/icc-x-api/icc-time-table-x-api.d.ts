import { IccTimeTableApi } from "../icc-api"
import { User } from "../icc-api/model/User"
import { TimeTable } from "../icc-api/model/TimeTable"
import { IccCryptoXApi } from "./icc-crypto-x-api"
export declare class IccTimeTableXApi extends IccTimeTableApi {
  i18n: any
  crypto: IccCryptoXApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(
    user: User,
    tt: TimeTable
  ): Promise<
    {
      id: string
      _type: string
      created: number
      modified: number
      responsible: string | undefined
      author: string | undefined
      codes: never[]
      tags: never[]
    } & TimeTable
  >
}
