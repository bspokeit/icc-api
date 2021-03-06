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

import { decodeBase64 } from "./ModelHelper"

export class InsurabilityDto {
  constructor(json: JSON | any) {
    Object.assign(this as InsurabilityDto, json)
  }

  parameters?: { [key: string]: string }
  hospitalisation?: boolean
  ambulatory?: boolean
  dental?: boolean
  identificationNumber?: string
  insuranceId?: string
  startDate?: number
  endDate?: number
  titularyId?: string
  encryptedSelf?: string
}
