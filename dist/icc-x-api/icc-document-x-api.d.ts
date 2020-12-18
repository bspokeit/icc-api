import { IccAuthApi, IccDocumentApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import * as models from "../icc-api/model/models"
export declare class IccDocumentXApi extends IccDocumentApi {
  crypto: IccCryptoXApi
  fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  authApi: IccAuthApi
  /** maps invalid UTI values to corresponding MIME type for backward-compatibility (pre-v1.0.117) */
  compatUtiRevDefs: {
    [key: string]: string
  }
  utiRevDefs: {
    [key: string]: string
  }
  utiExts: {
    [key: string]: string
  }
  utiDefs: {
    [key: string]: string
  }
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    authApi: IccAuthApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: models.User, message: models.Message, c: any): Promise<models.Document>
  private initDelegationsAndEncryptionKeys
  initEncryptionKeys(
    user: models.User,
    document: models.Document
  ): Promise<
    models.Document & {
      encryptionKeys: any
    }
  >
  findByMessage(hcpartyId: string, message: models.Message): Promise<void | models.Document[]>
  decrypt(
    hcpartyId: string,
    documents: Array<models.Document>
  ): Promise<Array<models.Document> | void>
  getAttachmentAs(
    documentId: string,
    attachmentId: string,
    returnType: "application/octet-stream",
    enckeys?: string,
    fileName?: string
  ): Promise<ArrayBuffer>
  getAttachmentAs(
    documentId: string,
    attachmentId: string,
    returnType: "text/plain",
    enckeys?: string,
    fileName?: string
  ): Promise<string>
  getAttachmentAs(
    documentId: string,
    attachmentId: string,
    returnType: "application/json",
    enckeys?: string,
    fileName?: string
  ): Promise<any>
  getAttachmentUrl(
    documentId: string,
    attachmentId: string,
    sfks: Array<{
      delegatorId: string
      key: CryptoKey
    }>,
    fileName?: string
  ): Promise<string>
  uti(mimeType: string, extension: string): string
  mimeType(uti: string): string
}
