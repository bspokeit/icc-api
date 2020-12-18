import { IccClassificationApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import * as models from "../icc-api/model/models"
export declare class IccClassificationXApi extends IccClassificationApi {
  crypto: IccCryptoXApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: models.User, patient: models.Patient, c: any): Promise<models.Classification>
  initDelegationsAndEncryptionKeys(
    user: models.User,
    patient: models.Patient,
    classification: models.Classification
  ): Promise<models.Classification>
  findBy(hcpartyId: string, patient: models.Patient): Promise<models.Classification[]>
}
