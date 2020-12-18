import * as models from "../icc-api/model/models"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import { IccCalendarItemApi } from "../icc-api"
import { CalendarItem, User } from "../icc-api/model/models"
export declare class IccCalendarItemXApi extends IccCalendarItemApi {
  i18n: any
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
  newInstance(
    user: User,
    ci: CalendarItem
  ): Promise<
    {
      id: string
      _type: string
      created: number
      modified: number
      responsible: string | undefined
      author: string | undefined
      codes: never[]
      tags: never[]
    } & models.CalendarItem
  >
  newInstancePatient(
    user: models.User,
    patient: models.Patient,
    ci: any,
    delegates?: string[]
  ): Promise<models.CalendarItem>
  initDelegationsAndEncryptionKeys(
    user: models.User,
    patient: models.Patient,
    calendarItem: models.CalendarItem,
    delegates?: string[]
  ): Promise<models.CalendarItem>
  findBy(hcpartyId: string, patient: models.Patient): Promise<any>
  findByHCPartyPatientSecretFKeys(
    hcPartyId: string,
    secretFKeys: string
  ): Promise<Array<models.CalendarItem> | any>
  createCalendarItem(body?: CalendarItem): never
  createCalendarItemWithHcParty(
    user: models.User,
    body?: models.CalendarItem
  ): Promise<models.CalendarItem | any>
  getCalendarItemWithUser(user: models.User, calendarItemId: string): Promise<CalendarItem | any>
  getCalendarItem(calendarItemId: string): never
  getCalendarItemsWithUser(user: models.User): Promise<Array<CalendarItem> | any>
  getCalendarItems(): never
  getCalendarItemsWithIdsWithUser(
    user: models.User,
    body?: models.ListOfIds
  ): Promise<Array<CalendarItem> | any>
  getCalendarItemsWithIds(body?: models.ListOfIds): never
  getCalendarItemsByPeriodAndHcPartyIdWithUser(
    user: models.User,
    startDate: number,
    endDate: number,
    hcPartyId: string
  ): Promise<Array<CalendarItem> | any>
  getCalendarItemsByPeriodAndHcPartyId(
    startDate?: number,
    endDate?: number,
    hcPartyId?: string
  ): never
  getCalendarsByPeriodAndAgendaIdWithUser(
    user: models.User,
    startDate: number,
    endDate: number,
    agendaId: string
  ): Promise<Array<CalendarItem> | any>
  getCalendarsByPeriodAndAgendaId(startDate?: number, endDate?: number, agendaId?: string): never
  modifyCalendarItem(body?: CalendarItem): never
  /**
   * Remove the following delegation objects from the
   * CalendarItem instance: cryptedForeignKeys, secretForeignKeys.
   *
   * The delegations & encryptionKeys objects are not removed because
   * in the case the CalendarItem is saved in the DB & then encrypted,
   * if later we remove the patient from it, it'd reset the delegations
   * and encryptionKeys thus impossibilitating further access.
   *
   * @param calendarItem The Calendar Item object
   */
  resetCalendarDelegationObjects(calendarItem: models.CalendarItem): models.CalendarItem
  modifyCalendarItemWithHcParty(
    user: models.User,
    body?: models.CalendarItem
  ): Promise<models.CalendarItem | any>
  initEncryptionKeys(
    user: models.User,
    calendarItem: models.CalendarItem
  ): Promise<
    models.CalendarItem & {
      encryptionKeys: any
    }
  >
  encrypt(
    user: models.User,
    calendarItems: Array<models.CalendarItem>
  ): Promise<Array<models.CalendarItem>>
  decrypt(
    hcpId: string,
    calendarItems: Array<models.CalendarItem>
  ): Promise<Array<models.CalendarItem>>
}
