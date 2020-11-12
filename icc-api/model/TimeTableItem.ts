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
import { TimeTableHour } from "./TimeTableHour"

import { decodeBase64 } from "./ModelHelper"

export class TimeTableItem {
  constructor(json: JSON | any) {
    Object.assign(this as TimeTableItem, json)
  }

  days?: Array<string>
  hours?: Array<TimeTableHour>
  recurrenceTypes?: Array<string>
  calendarItemTypeId?: string
  homeVisit?: boolean
  placeId?: string
  unavailable?: boolean
}