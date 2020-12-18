import { IccContactApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import * as models from "../icc-api/model/models"
import { Contact, Service } from "../icc-api/model/models"
import { PaginatedListContact } from "../icc-api/model/PaginatedListContact"
export declare class IccContactXApi extends IccContactApi {
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
    user: models.User,
    patient: models.Patient,
    c: any,
    confidential?: boolean
  ): Promise<models.Contact>
  /**
   * 1. Extract(decrypt) the patient's secretForeignKeys from the
   * "delegations" object.
   * 2. Initialize & encrypt the Contact's delegations & cryptedForeignKeys.
   * 3. Initialize & encrypt the Contact's encryptionKeys.
   * 4. Return the contact with the extended delegations, cryptedForeignKeys
   * & encryptionKeys.
   */
  private initDelegationsAndEncryptionKeys
  initEncryptionKeys(
    user: models.User,
    ctc: models.Contact
  ): Promise<
    models.Contact & {
      encryptionKeys: any
    }
  >
  /**
   * 1. Check whether there is a delegation with 'hcpartyId' or not.
   * 2. 'fetchHcParty[hcpartyId][1]': is encrypted AES exchange key by RSA public key of him.
   * 3. Obtain the AES exchange key, by decrypting the previous step value with hcparty private key
   *      3.1.  KeyPair should be fetch from cache (in jwk)
   *      3.2.  if it doesn't exist in the cache, it has to be loaded from Browser Local store, and then import it to WebCrypto
   * 4. Obtain the array of delegations which are delegated to his ID (hcpartyId) in this patient
   * 5. Decrypt and collect all keys (secretForeignKeys) within delegations of previous step (with obtained AES key of step 4)
   * 6. Do the REST call to get all contacts with (allSecretForeignKeysDelimitedByComa, hcpartyId)
   *
   * After these painful steps, you have the contacts of the patient.
   *
   * @param hcpartyId
   * @param patient (Promise)
   */
  findBy(hcpartyId: string, patient: models.Patient): Promise<any[]>
  findByPatientSFKs(
    hcpartyId: string,
    patients: Array<models.Patient>
  ): Promise<Array<models.Contact>>
  filterBy(
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    body?: models.FilterChainContact
  ): never
  listContactsByOpeningDate(
    startKey: number,
    endKey: number,
    hcpartyid: string,
    startDocumentId?: string,
    limit?: number
  ): never
  findByHCPartyFormId(hcPartyId?: string, formId?: string): never
  findByHCPartyFormIds(hcPartyId?: string, body?: models.ListOfIds): never
  getContact(contactId: string): never
  getContacts(body?: models.ListOfIds): never
  modifyContact(body?: Contact): never
  modifyContacts(body?: Array<Contact>): never
  createContact(body?: Contact): never
  findByHCPartyPatientSecretFKeys(
    hcPartyId: string,
    secretFKeys: string,
    planOfActionIds?: string,
    skipClosedContacts?: boolean
  ): Promise<Array<models.Contact> | any>
  filterByWithUser(
    user: models.User,
    startDocumentId?: string,
    limit?: number,
    body?: models.FilterChainContact
  ): Promise<PaginatedListContact | any>
  listContactsByOpeningDateWithUser(
    user: models.User,
    startKey: number,
    endKey: number,
    hcpartyid: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<PaginatedListContact | any>
  findByHCPartyFormIdWithUser(
    user: models.User,
    hcPartyId: string,
    formId: string
  ): Promise<Array<models.Contact> | any>
  findByHCPartyFormIdsWithUser(
    user: models.User,
    hcPartyId: string,
    body: models.ListOfIds
  ): Promise<Array<models.Contact> | any>
  getContactWithUser(user: models.User, contactId: string): Promise<models.Contact | any>
  getContactsWithUser(
    user: models.User,
    body?: models.ListOfIds
  ): Promise<Array<models.Contact> | any>
  modifyContactWithUser(user: models.User, body?: models.Contact): Promise<models.Contact | any>
  modifyContactsWithUser(
    user: models.User,
    bodies?: Array<models.Contact>
  ): Promise<models.Contact | any>
  createContactWithUser(user: models.User, body?: models.Contact): Promise<models.Contact | any>
  encryptServices(key: CryptoKey, rawKey: string, services: Service[]): PromiseLike<Service[]>
  encrypt(user: models.User, ctcs: Array<models.Contact>): Promise<models.Contact[]>
  decrypt(hcpartyId: string, ctcs: Array<models.Contact>): Promise<Array<models.Contact>>
  decryptServices(
    hcpartyId: string,
    svcs: Array<models.Service>,
    key?: CryptoKey,
    rawKey?: string
  ): Promise<Array<models.Service>>
  contactOfService(ctcs: Array<models.Contact>, svcId: string): models.Contact | undefined
  filteredServices(ctcs: Array<models.Contact>, filter: any): Array<models.Service>
  filterServices(ctcs: Array<models.Contact>, filter: any): Promise<Array<models.Service>>
  services(ctc: models.Contact, label: string): models.Service[]
  preferredContent(svc: models.Service, lng: string): models.Content | undefined
  contentValue(
    c: models.Content
  ): string | number | boolean | models.Measure | models.Medication | undefined
  shortServiceDescription(svc: models.Service, lng: string): string | number
  shortContentDescription(c: models.Content, lng: string, label?: string): string | number
  medicationValue(svc: models.Service, lng: string): models.Medication | undefined
  contentHasData(c: any): boolean
  localize(e: any, lng: string): any
  /**
   * Modifies the subcontacts this svc belongs to while minimizing the number of references to the svcs inside the subcontacts
   * After the invocation, there is at least one subcontact with provided poaId and heId that contains the svc
   * The svc is not removed from a previous subcontact it would belong to except if the new conditions are compatible
   * Note that undefined and null do not have the same meaning for formId
   * If formId is null: the subcontact which refers svc must have a null formId
   * If formId is undefined, the subcontact can have any value for formId
   *
   * When a svc does not exist yet in the current contact but exists in a previous contact, all the scs it was belonging to are
   * copied in the current contact
   *
   * the svc returned is the one that's inside the ctc
   *
   * @param ctc
   * @param user
   * @param ctcs
   * @param svc
   * @param formId
   * @param poaId aMap {heId2: [poaId11, poaId12], heId2: [poaId21] }
   * @param heId an Array of heIds, equivalent to poaIds = {heId: [], ...}
   * @param init
   * @returns {*}
   */
  promoteServiceInContact(
    ctc: models.Contact,
    user: models.User,
    ctcs: Array<models.Contact>,
    svc: models.Service,
    formId: string,
    poaIds?: {
      [key: string]: string[]
    },
    heIds?: Array<string>,
    init?: any
  ): any
  isNumeric(svc: models.Service, lng: string): number | boolean | models.Measure | undefined
  service(): {
    newInstance: (user: models.User, s: any) => any
  }
  medication(): {
    regimenScores: () => any
    medicationNameToString: (m: any) => string
    reimbursementReasonToString: (m: any, lang: string) => any
    medicationToString: (m: any, lang: string) => string
    productToString: (m: any) => string
    posologyToString: (m: any, lang: string) => any
    frequencyToString: (m: any, lang: string) => any
    durationToString: (d: models.Duration, lang: string) => string
    regimenToExtString: (r: models.RegimenItem, lang: string) => string
    regimenToString: (r: models.RegimenItem, lang: string) => string | null
    localize: (s: any, lang: string) => any
  }
}
