import { IccHcpartyApi } from "../icc-api"
import { HealthcareParty } from "../icc-api/model/HealthcareParty"
export declare class IccHcpartyXApi extends IccHcpartyApi {
  hcPartyKeysCache: {
    [key: string]: {
      [key: string]: string
    }
  }
  hcPartyCache: {
    [key: string]: [number, Promise<HealthcareParty>]
  }
  private CACHE_RETENTION_IN_MS
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  private getHcPartyFromCache
  putHcPartyInCache(key: string, value?: Promise<HealthcareParty> | null): Promise<HealthcareParty>
  modifyHealthcareParty(body?: HealthcareParty): Promise<HealthcareParty | any>
  getHealthcareParty(
    healthcarePartyId: string,
    bypassCache?: boolean
  ): Promise<HealthcareParty | any>
  getHealthcareParties(healthcarePartyIds: string): Promise<Array<HealthcareParty> | any>
  getCurrentHealthcareParty(): Promise<HealthcareParty | any>
  getHcPartyKeysForDelegate(
    healthcarePartyId: string,
    bypassCache?: boolean
  ): Promise<{
    [key: string]: string
  }>
  isValidCbe(cbe: string): boolean
}
