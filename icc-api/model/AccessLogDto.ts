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
import { CodeDto } from "./CodeDto"
import { DelegationDto } from "./DelegationDto"

export class AccessLogDto {
  constructor(json: JSON | any) {
    Object.assign(this as AccessLogDto, json)
  }

  id?: string
  rev?: string
  deletionDate?: number
  created?: number
  modified?: number
  endOfLife?: number
  author?: string
  responsible?: string
  medicalLocationId?: string
  encryptedSelf?: string
  codes?: Array<CodeDto>
  tags?: Array<CodeDto>
  secretForeignKeys?: Array<string>
  cryptedForeignKeys?: { [key: string]: Array<DelegationDto> }
  delegations?: { [key: string]: Array<DelegationDto> }
  encryptionKeys?: { [key: string]: Array<DelegationDto> }
  accessType?: string
  date?: number
  patientId?: string
  objectId?: string
  user?: string
  detail?: string
}
