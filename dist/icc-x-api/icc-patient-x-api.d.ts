import { IccPatientApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import { IccContactXApi } from "./icc-contact-x-api"
import { IccFormXApi } from "./icc-form-x-api"
import { IccHcpartyXApi } from "./icc-hcparty-x-api"
import { IccInvoiceXApi } from "./icc-invoice-x-api"
import { IccDocumentXApi } from "./icc-document-x-api"
import { IccHelementXApi } from "./icc-helement-x-api"
import { IccClassificationXApi } from "./icc-classification-x-api"
import * as models from "../icc-api/model/models"
import { IccCalendarItemXApi } from "./icc-calendar-item-x-api"
export declare class IccPatientXApi extends IccPatientApi {
  crypto: IccCryptoXApi
  contactApi: IccContactXApi
  formApi: IccFormXApi
  helementApi: IccHelementXApi
  invoiceApi: IccInvoiceXApi
  hcpartyApi: IccHcpartyXApi
  documentApi: IccDocumentXApi
  classificationApi: IccClassificationXApi
  calendarItemApi: IccCalendarItemXApi
  private cryptedKeys
  static api(
    host: string,
    username: string,
    password: string,
    crypto?: Crypto,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  ): IccPatientXApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    contactApi: IccContactXApi,
    formApi: IccFormXApi,
    helementApi: IccHelementXApi,
    invoiceApi: IccInvoiceXApi,
    documentApi: IccDocumentXApi,
    hcpartyApi: IccHcpartyXApi,
    classificationApi: IccClassificationXApi,
    calendarItemaApi: IccCalendarItemXApi,
    cryptedKeys?: Array<string>,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: models.User, p: any): Promise<models.Patient>
  initDelegations(
    patient: models.Patient,
    user: models.User,
    secretForeignKey?: string
  ): Promise<models.Patient>
  initConfidentialDelegation(
    patient: models.Patient,
    user: models.User
  ): Promise<models.Patient | null>
  createPatient(body?: models.Patient): never
  createPatientWithUser(user: models.User, body?: models.Patient): Promise<models.Patient | any>
  filterBy(
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    skip?: number,
    sort?: string,
    desc?: boolean,
    body?: models.FilterChainPatient
  ): never
  filterByWithUser(
    user: models.User,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    skip?: number,
    sort?: string,
    desc?: boolean,
    body?: models.FilterChainPatient
  ): Promise<models.PaginatedListPatient | any>
  findByAccessLogUserAfterDate(
    userId: string,
    accessType?: string,
    startDate?: number,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): never
  findByAccessLogUserAfterDateWithUser(
    user: models.User,
    userId: string,
    accessType?: string,
    startDate?: number,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PaginatedListPatient | any>
  findByAccessLogUserAfterDate_1(externalId: string): never
  findByExternalIdWithUser(user: models.User, externalId: string): Promise<models.Patient | any>
  findByNameBirthSsinAuto(
    healthcarePartyId?: string,
    filterValue?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): never
  findByNameBirthSsinAutoWithUser(
    user: models.User,
    healthcarePartyId?: string,
    filterValue?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PaginatedListPatient | any>
  fuzzySearch(firstName?: string, lastName?: string, dateOfBirth?: number): never
  fuzzySearchWithUser(
    user: models.User,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: number
  ): Promise<Array<models.Patient> | any>
  getPatient(patientId: string): never
  getPatientRaw(patientId: string): Promise<models.Patient | any>
  getPatientWithUser(user: models.User, patientId: string): Promise<models.Patient | any>
  getPatients(body?: models.ListOfIds): never
  getPatientsWithUser(
    user: models.User,
    body?: models.ListOfIds
  ): Promise<Array<models.Patient> | any>
  listDeletedPatients(
    startDate?: number,
    endDate?: number,
    desc?: boolean,
    startDocumentId?: string,
    limit?: number
  ): never
  listDeletedPatientsWithUser(
    user: models.User,
    startDate?: number,
    endDate?: number,
    desc?: boolean,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PaginatedListPatient | any>
  listDeletedPatients_2(firstName?: string, lastName?: string): never
  listDeletedPatientsByNameWithUser(
    user: models.User,
    firstName?: string,
    lastName?: string
  ): Promise<Array<models.Patient> | any>
  listOfMergesAfter(date: number): never
  listOfMergesAfterWithUser(user: models.User, date: number): Promise<Array<models.Patient> | any>
  listOfPatientsModifiedAfter(
    date: number,
    startKey?: number,
    startDocumentId?: string,
    limit?: number
  ): never
  listOfPatientsModifiedAfterWithUser(
    user: models.User,
    date: number,
    startKey?: number,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PaginatedListPatient | any>
  listPatients(
    hcPartyId?: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): never
  listPatientsWithUser(
    user: models.User,
    hcPartyId?: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PaginatedListPatient | any>
  listPatientsByHcParty(
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): never
  listPatientsByHcPartyWithUser(
    user: models.User,
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PaginatedListPatient | any>
  listPatientsOfHcParty(
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): never
  listPatientsOfHcPartyWithUser(
    user: models.User,
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PaginatedListPatient | any>
  mergeInto(toId: string, fromIds: string): never
  mergeIntoWithUser(user: models.User, toId: string, fromIds: string): Promise<models.Patient | any>
  modifyPatient(body?: models.Patient): never
  modifyPatientRaw(body?: models.Patient): Promise<models.Patient | any>
  modifyPatientWithUser(user: models.User, body?: models.Patient): Promise<models.Patient | null>
  modifyPatientReferral(patientId: string, referralId: string, start?: number, end?: number): never
  modifyPatientReferralWithUser(
    user: models.User,
    patientId: string,
    referralId: string,
    start?: number,
    end?: number
  ): Promise<models.Patient | any>
  encrypt(user: models.User, pats: Array<models.Patient>): Promise<Array<models.Patient>>
  decrypt(
    user: models.User,
    pats: Array<models.Patient>,
    fillDelegations?: boolean
  ): Promise<Array<models.Patient>>
  initEncryptionKeys(
    user: models.User,
    pat: models.Patient
  ): Promise<
    models.Patient & {
      encryptionKeys: any
    }
  >
  share(
    user: models.User,
    patId: string,
    ownerId: string,
    delegateIds: Array<string>,
    delegationTags: {
      [key: string]: Array<string>
    }
  ): Promise<{
    patient: models.Patient | null
    statuses: {
      [key: string]: {
        success: boolean | null
        error: Error | null
      }
    }
  } | null>
  export(
    user: models.User,
    patId: string,
    ownerId: string
  ): Promise<{
    id: string
  }>
  checkInami(inami: String): Boolean
  isValidSsin(ssin: string): boolean
  getPatientIdOfChildDocumentForHcpAndHcpParents(
    childDocument: models.Invoice | models.CalendarItem | models.Contact,
    hcpId: string
  ): Promise<string>
}
