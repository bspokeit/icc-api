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

export class CareTeamMembershipDto {
  constructor(json: JSON | any) {
    Object.assign(this as CareTeamMembershipDto, json)
  }

  startDate?: number
  endDate?: number
  careTeamMemberId?: string
  membershipType?: CareTeamMembershipDto.MembershipTypeEnum
  encryptedSelf?: string
}
export namespace CareTeamMembershipDto {
  export type MembershipTypeEnum = "doctor" | "mutuality" | "patient" | "specialist" | "other"
  export const MembershipTypeEnum = {
    Doctor: "doctor" as MembershipTypeEnum,
    Mutuality: "mutuality" as MembershipTypeEnum,
    Patient: "patient" as MembershipTypeEnum,
    Specialist: "specialist" as MembershipTypeEnum,
    Other: "other" as MembershipTypeEnum
  }
}
