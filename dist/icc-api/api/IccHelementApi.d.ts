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
import { Delegation } from "../model/Delegation"
import { DocIdentifier } from "../model/DocIdentifier"
import { FilterChainHealthElement } from "../model/FilterChainHealthElement"
import { HealthElement } from "../model/HealthElement"
import { IcureStub } from "../model/IcureStub"
export declare class IccHelementApi {
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
   * Returns an instance of created health element.
   * @summary Create a health element with the current user
   * @param body
   */
  createHealthElement(body?: HealthElement): Promise<HealthElement>
  /**
   * Response is a set containing the ID's of deleted health elements.
   * @summary Delete health elements.
   * @param healthElementIds
   */
  deleteHealthElements(healthElementIds: string): Promise<Array<DocIdentifier>>
  /**
   * Returns a list of health elements along with next start keys and Document ID. If the nextStartKey is Null it means that this is the last page.
   * @summary Filter health elements for the current user (HcParty)
   * @param body
   */
  filterHealthElementsBy(body?: FilterChainHealthElement): Promise<Array<HealthElement>>
  /**
   * Keys hast to delimited by coma
   * @summary List health elements found By Healthcare Party and secret foreign keyelementIds.
   * @param hcPartyId
   * @param secretFKeys
   */
  findHealthElementsByHCPartyPatientForeignKeys(
    hcPartyId: string,
    secretFKeys: string
  ): Promise<Array<HealthElement>>
  /**
   * Keys must be delimited by coma
   * @summary List helement stubs found By Healthcare Party and secret foreign keys.
   * @param hcPartyId
   * @param secretFKeys
   */
  findHealthElementsDelegationsStubsByHCPartyPatientForeignKeys(
    hcPartyId: string,
    secretFKeys: string
  ): Promise<Array<IcureStub>>
  /**
   *
   * @summary Get a health element
   * @param healthElementId
   */
  getHealthElement(healthElementId: string): Promise<HealthElement>
  /**
   * Returns the modified health element.
   * @summary Modify a health element
   * @param body
   */
  modifyHealthElement(body?: HealthElement): Promise<HealthElement>
  /**
   * Returns the modified health elements.
   * @summary Modify a batch of health elements
   * @param body
   */
  modifyHealthElements(body?: Array<HealthElement>): Promise<Array<HealthElement>>
  /**
   * It delegates a health element to a healthcare party (By current healthcare party). Returns the element with new delegations.
   * @summary Delegates a health element to a healthcare party
   * @param body
   * @param healthElementId
   */
  newHealthElementDelegations(
    healthElementId: string,
    body?: Array<Delegation>
  ): Promise<HealthElement>
  /**
   * Keys must be delimited by coma
   * @summary Update delegations in healthElements.
   * @param body
   */
  setHealthElementsDelegations(body?: Array<IcureStub>): Promise<Array<HealthElement>>
}
