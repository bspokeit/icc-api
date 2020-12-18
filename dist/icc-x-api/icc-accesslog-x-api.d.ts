import { IccAccesslogApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import * as models from "../icc-api/model/models"
import { PaginatedListAccessLog } from "../icc-api/model/models"
export declare class IccAccesslogXApi extends IccAccesslogApi {
  crypto: IccCryptoXApi
  cryptedKeys: string[]
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: models.User, patient: models.Patient, h: any): Promise<any>
  /**
   * 1. Check whether there is a delegation with 'hcpartyId' or not.
   * 2. 'fetchHcParty[hcpartyId][1]': is encrypted AES exchange key by RSA public key of him.
   * 3. Obtain the AES exchange key, by decrypting the previous step value with hcparty private key
   *      3.1.  KeyPair should be fetch from cache (in jwk)
   *      3.2.  if it doesn't exist in the cache, it has to be loaded from Browser Local store, and then import it to WebCrypto
   * 4. Obtain the array of delegations which are delegated to his ID (hcpartyId) in this patient
   * 5. Decrypt and collect all keys (secretForeignKeys) within delegations of previous step (with obtained AES key of step 4)
   * 6. Do the REST call to get all helements with (allSecretForeignKeysDelimitedByComa, hcpartyId)
   *
   * After these painful steps, you have the helements of the patient.
   *
   * @param hcpartyId
   * @param patient (Promise)
   * @param keepObsoleteVersions
   */
  findBy(hcpartyId: string, patient: models.Patient): Promise<any>
  findByHCPartyPatientSecretFKeys(
    hcPartyId: string,
    secretFKeys: string
  ): Promise<Array<models.Contact> | any>
  decrypt(hcpId: string, accessLogs: Array<models.AccessLog>): Promise<Array<models.AccessLog>>
  initEncryptionKeys(
    user: models.User,
    accessLog: models.AccessLog
  ): Promise<
    models.AccessLog & {
      encryptionKeys: any
    }
  >
  encrypt(user: models.User, accessLogs: Array<models.AccessLog>): Promise<Array<models.AccessLog>>
  createAccessLog(body?: models.AccessLog): never
  createAccessLogWithUser(
    user: models.User,
    body?: models.AccessLog
  ): Promise<models.AccessLog | any>
  getAccessLog(accessLogId: string): never
  getAccessLogWithUser(user: models.User, accessLogId: string): Promise<models.AccessLog | any>
  listAccessLogs(
    fromEpoch?: number,
    toEpoch?: number,
    startKey?: number,
    startDocumentId?: string,
    limit?: number
  ): never
  listAccessLogsWithUser(
    user: models.User,
    fromEpoch?: number,
    toEpoch?: number,
    startKey?: number,
    startDocumentId?: string,
    limit?: number,
    descending?: boolean
  ): Promise<PaginatedListAccessLog>
  modifyAccessLog(body?: models.AccessLog): never
  modifyAccessLogWithUser(
    user: models.User,
    body?: models.AccessLog
  ): Promise<models.AccessLog | null>
  findByUserAfterDate(
    userId: string,
    accessType?: string,
    startDate?: number,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    descending?: boolean
  ): never
  findByUserAfterDateWithUser(
    user: models.User,
    userId: string,
    accessType?: string,
    startDate?: number,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    descending?: boolean
  ): Promise<models.AccessLog | any>
}
