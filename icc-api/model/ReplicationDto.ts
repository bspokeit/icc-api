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
import { DatabaseSynchronizationDto } from "./DatabaseSynchronizationDto"

import { decodeBase64 } from "./ModelHelper"

export class ReplicationDto {
  constructor(json: JSON | any) {
    Object.assign(this as ReplicationDto, json)
  }

  id?: string
  rev?: string
  deletionDate?: number
  name?: string
  context?: string
  databaseSynchronizations?: Array<DatabaseSynchronizationDto>
}