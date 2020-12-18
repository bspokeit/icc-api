/**
 * iCure Cloud API Documentation
 * Spring shop sample application
 *
 * OpenAPI spec version: v0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { XHR } from "./XHR"
import { AbstractFilterPatient } from "../model/AbstractFilterPatient"
import { Content } from "../model/Content"
import { Delegation } from "../model/Delegation"
import { DocIdentifier } from "../model/DocIdentifier"
import { FilterChainPatient } from "../model/FilterChainPatient"
import { IdWithRev } from "../model/IdWithRev"
import { ListOfIds } from "../model/ListOfIds"
import { PaginatedListPatient } from "../model/PaginatedListPatient"
import { PaginatedListString } from "../model/PaginatedListString"
import { Patient } from "../model/Patient"
export declare class IccPatientApi {
  host: string
  headers: Array<XHR.Header>
  fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  constructor(
    host: string,
    headers: any,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  setHeaders(h: Array<XHR.Header>): void
  handleError(e: XHR.XHRError): never
  /**
   * Returns the id and _rev of created patients
   * @summary Modify a patient
   * @param body
   */
  bulkUpdatePatients(body?: Array<Patient>): Promise<Array<IdWithRev>>
  /**
   * Returns the count of patients
   * @summary Get count of patients for a specific HcParty or for the current HcParty
   * @param hcPartyId Healthcare party id
   */
  countOfPatients(hcPartyId: string): Promise<Content>
  /**
   * Name, last name, date of birth, and gender are required. After creation of the patient and obtaining the ID, you need to create an initial delegation.
   * @summary Create a patient
   * @param body
   */
  createPatient(body?: Patient): Promise<Patient>
  /**
   * Response is an array containing the ID of deleted patient..
   * @summary Delete patients.
   * @param patientIds
   */
  deletePatient(patientIds: string): Promise<Array<DocIdentifier>>
  /**
   * Returns a list of patients along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary Filter patients for the current user (HcParty)
   * @param body
   * @param startKey The start key for pagination, depends on the filters used
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   * @param skip Skip rows
   * @param sort Sort key
   * @param desc Descending
   */
  filterPatientsBy(
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    skip?: number,
    sort?: string,
    desc?: boolean,
    body?: FilterChainPatient
  ): Promise<PaginatedListPatient>
  /**
   *
   * @summary Get Paginated List of Patients sorted by Access logs descending
   * @param userId A User ID
   * @param accessType The type of access (COMPUTER or USER)
   * @param startDate The start search epoch
   * @param startKey The start key for pagination
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   */
  findByAccessLogUserAfterDate(
    userId: string,
    accessType?: string,
    startDate?: number,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<PaginatedListPatient>
  /**
   *
   * @summary Get Paginated List of Patients sorted by Access logs descending
   * @param externalId A external ID
   */
  findByExternalId(externalId: string): Promise<Patient>
  /**
   * Returns a list of patients along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary Find patients for the current user (HcParty)
   * @param healthcarePartyId HealthcareParty Id, if unset will user user&#x27;s hcpId
   * @param filterValue Optional value for filtering results
   * @param startKey The start key for pagination: a JSON representation of an array containing all the necessary components to form the Complex Key&#x27;s startKey
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   * @param sortDirection Optional value for providing a sorting direction (&#x27;asc&#x27;, &#x27;desc&#x27;). Set to &#x27;asc&#x27; by default.
   */
  findByNameBirthSsinAuto(
    healthcarePartyId?: string,
    filterValue?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<PaginatedListPatient>
  /**
   * Returns a list of patients
   * @summary Filter patients for the current user (HcParty)
   * @param firstName The first name
   * @param lastName The last name
   * @param dateOfBirth The date of birth
   */
  fuzzySearch(firstName?: string, lastName?: string, dateOfBirth?: number): Promise<Array<Patient>>
  /**
   * It gets patient administrative data.
   * @summary Get patient
   * @param patientId
   */
  getPatient(patientId: string): Promise<Patient>
  /**
   * This endpoint is used to recover all keys that have already been created and that can be used to share information with this patient. It returns a map with the following structure: ID of the owner of the encrypted AES key -> encrypted AES key. The returned encrypted AES keys will have to be decrypted using the patient's private key.
   * @summary Get the patient (identified by patientId) hcparty keys. Those keys are AES keys (encrypted) used to share information between HCPs and a patient.
   * @param patientId The patient Id for which information is shared
   */
  getPatientHcPartyKeysForDelegate(patientId: string): Promise<string>
  /**
   * It gets patient administrative data.
   * @summary Get patients by id
   * @param body
   */
  getPatients(body?: ListOfIds): Promise<Array<Patient>>
  /**
   * Returns a list of deleted patients, within the specified time period, if any.
   * @summary Find deleted patients
   * @param startDate Filter deletions after this date (unix epoch), included
   * @param endDate Filter deletions before this date (unix epoch), included
   * @param desc Descending
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   */
  listDeletedPatients(
    startDate?: number,
    endDate?: number,
    desc?: boolean,
    startDocumentId?: string,
    limit?: number
  ): Promise<PaginatedListPatient>
  /**
   * Returns a list of deleted patients, by name and/or firstname prefix, if any.
   * @summary Find deleted patients
   * @param firstName First name prefix
   * @param lastName Last name prefix
   */
  listDeletedPatientsByName(firstName?: string, lastName?: string): Promise<Array<Patient>>
  /**
   * Returns a list of patients that have been merged after the provided date
   * @summary List patients that have been merged towards another patient
   * @param date
   */
  listOfMergesAfter(date: number): Promise<Array<Patient>>
  /**
   * Returns a list of patients that have been modified after the provided date
   * @summary List patients that have been modified after the provided date
   * @param date
   * @param startKey The start key for pagination the date of the first element of the new page
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   */
  listOfPatientsModifiedAfter(
    date: number,
    startKey?: number,
    startDocumentId?: string,
    limit?: number
  ): Promise<PaginatedListPatient>
  /**
   * Returns a list of patients along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary List patients for a specific HcParty
   * @param hcPartyId Healthcare party id
   * @param sortField Optional value for sorting results by a given field (&#x27;name&#x27;, &#x27;ssin&#x27;, &#x27;dateOfBirth&#x27;). Specifying this deactivates filtering
   * @param startKey The start key for pagination: a JSON representation of an array containing all the necessary components to form the Complex Key&#x27;s startKey
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   * @param sortDirection Optional value for providing a sorting direction (&#x27;asc&#x27;, &#x27;desc&#x27;). Set to &#x27;asc&#x27; by default.
   */
  listPatients(
    hcPartyId?: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<PaginatedListPatient>
  /**
   * Returns a list of patients along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary List patients for a specific HcParty or for the current HcParty
   * @param hcPartyId
   * @param sortField Optional value for sorting results by a given field (&#x27;name&#x27;, &#x27;ssin&#x27;, &#x27;dateOfBirth&#x27;). Specifying this deactivates filtering
   * @param startKey The start key for pagination: a JSON representation of an array containing all the necessary components to form the Complex Key&#x27;s startKey
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   * @param sortDirection Optional value for providing a sorting direction (&#x27;asc&#x27;, &#x27;desc&#x27;). Set to &#x27;asc&#x27; by default.
   */
  listPatientsByHcParty(
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<PaginatedListPatient>
  /**
   * Returns a list of patients along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary List patients by pages for a specific HcParty
   * @param hcPartyId Healthcare party id
   * @param startKey The page first id
   * @param startDocumentId A patient document ID
   * @param limit Page size
   */
  listPatientsIds(
    hcPartyId: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<PaginatedListString>
  /**
   * Returns a list of patients along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary List patients of a specific HcParty or of the current HcParty
   * @param hcPartyId
   * @param sortField Optional value for sorting results by a given field (&#x27;name&#x27;, &#x27;ssin&#x27;, &#x27;dateOfBirth&#x27;). Specifying this deactivates filtering
   * @param startKey The start key for pagination: a JSON representation of an array containing all the necessary components to form the Complex Key&#x27;s startKey
   * @param startDocumentId A patient document ID
   * @param limit Number of rows
   * @param sortDirection Optional value for providing a sorting direction (&#x27;asc&#x27;, &#x27;desc&#x27;). Set to &#x27;asc&#x27; by default.
   */
  listPatientsOfHcParty(
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<PaginatedListPatient>
  /**
   *
   * @summary Get ids of patients matching the provided filter for the current user (HcParty)
   * @param body
   */
  matchPatientsBy(body?: AbstractFilterPatient): Promise<Array<string>>
  /**
   *
   * @summary Merge a series of patients into another patient
   * @param toId
   * @param fromIds
   */
  mergeInto(toId: string, fromIds: string): Promise<Patient>
  /**
   * No particular return value. It's just a message.
   * @summary Modify a patient
   * @param body
   */
  modifyPatient(body?: Patient): Promise<Patient>
  /**
   *
   * @summary Set a patient referral doctor
   * @param patientId
   * @param referralId The referal id. Accepts &#x27;none&#x27; for referral removal.
   * @param start Optional value for start of referral
   * @param end Optional value for end of referral
   */
  modifyPatientReferral(
    patientId: string,
    referralId: string,
    start?: number,
    end?: number
  ): Promise<Patient>
  /**
   * It delegates a patient to a healthcare party (By current healthcare party). A modified patient with new delegation gets returned.
   * @summary Delegates a patients to a healthcare party
   * @param body
   * @param patientId
   */
  newPatientDelegations(patientId: string, body?: Array<Delegation>): Promise<Patient>
  /**
   * Response is an array containing the ID of undeleted patient..
   * @summary undelete previously deleted patients
   * @param patientIds
   */
  undeletePatient(patientIds: string): Promise<Array<DocIdentifier>>
}
