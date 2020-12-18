import { IccReceiptApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import * as models from "../icc-api/model/models"
export declare class IccReceiptXApi extends IccReceiptApi {
  crypto: IccCryptoXApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: models.User, r: any): Promise<models.Receipt>
  private initDelegationsAndEncryptionKeys
  initEncryptionKeys(
    user: models.User,
    rcpt: models.Receipt
  ): Promise<
    models.Receipt & {
      encryptionKeys: any
    }
  >
  logReceipt(
    user: models.User,
    docId: string,
    refs: Array<string>,
    blobType: string,
    blob: ArrayBuffer
  ): Promise<models.Receipt>
}
