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
import { Appointment } from "../model/Appointment"
import { AppointmentImport } from "../model/AppointmentImport"
import { EmailOrSmsMessage } from "../model/EmailOrSmsMessage"
import { MikronoAppointmentTypeRest } from "../model/MikronoAppointmentTypeRest"
import { MikronoCredentials } from "../model/MikronoCredentials"
import { Unit } from "../model/Unit"
import { User } from "../model/User"
export declare class IccBemikronoApi {
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
   *
   * @summary Get appointments for patient
   * @param calendarDate
   */
  appointmentsByDate(calendarDate: number): Promise<Array<Appointment>>
  /**
   *
   * @summary Get appointments for patient
   * @param patientId
   * @param from
   * @param to
   */
  appointmentsByPatient(patientId: string, from?: number, to?: number): Promise<Array<Appointment>>
  /**
   *
   * @param body
   */
  createAppointmentTypes(
    body?: Array<MikronoAppointmentTypeRest>
  ): Promise<Array<MikronoAppointmentTypeRest>>
  /**
   *
   * @summary Create appointments for owner
   * @param body
   */
  createAppointments(body?: Array<AppointmentImport>): Promise<Array<string>>
  /**
   *
   * @summary Notify of an appointment change
   * @param appointmentId
   * @param action
   */
  notify(appointmentId: string, action: string): Promise<any | Boolean>
  /**
   *
   * @summary Set credentials for provided user
   * @param body
   * @param userId
   */
  register(userId: string, body?: MikronoCredentials): Promise<User>
  /**
   *
   * @summary Send message using mikrono from logged user
   * @param body
   */
  sendMessage(body?: EmailOrSmsMessage): Promise<Unit>
  /**
   *
   * @summary Set credentials for provided user
   * @param body
   * @param userId
   */
  setUserCredentials(userId: string, body?: MikronoCredentials): Promise<User>
}
