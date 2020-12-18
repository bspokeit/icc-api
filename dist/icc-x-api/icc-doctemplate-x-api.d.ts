import { IccDoctemplateApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import * as models from "../icc-api/model/models"
import { DocumentTemplate } from "../icc-api/model/models"
export declare class IccDoctemplateXApi extends IccDoctemplateApi {
  crypto: IccCryptoXApi
  fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: models.User, template: string, c: any): Promise<DocumentTemplate>
  findAllByOwnerId(ownerId: string): Promise<Array<models.DocumentTemplate>>
  getAttachmentUrl(documentId: string, attachmentId: string): string
}
