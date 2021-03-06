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
import { HealthcarePartyDto } from "./HealthcarePartyDto"
import { ReplicationDto } from "./ReplicationDto"
import { UserDto } from "./UserDto"

import { decodeBase64 } from "./ModelHelper"

export class DatabaseInitialisationDto {
  constructor(json: JSON | any) {
    Object.assign(this as DatabaseInitialisationDto, json)
  }

  users?: Array<UserDto>
  healthcareParties?: Array<HealthcarePartyDto>
  replication?: ReplicationDto
}
