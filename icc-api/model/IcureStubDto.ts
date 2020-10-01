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
import { CodeStubDto } from "./CodeStubDto"
import { DelegationDto } from "./DelegationDto"

import { decodeBase64 } from "./ModelHelper"

export class IcureStubDto {
  constructor(json: JSON | any) {
    Object.assign(this as IcureStubDto, json)
  }

  id?: string
  rev?: string
  created?: number
  modified?: number
  author?: string
  responsible?: string
  medicalLocationId?: string
  tags?: Array<CodeStubDto>
  codes?: Array<CodeStubDto>
  endOfLife?: number
  secretForeignKeys?: Array<string>
  cryptedForeignKeys?: { [key: string]: Array<DelegationDto> }
  delegations?: { [key: string]: Array<DelegationDto> }
  encryptionKeys?: { [key: string]: Array<DelegationDto> }
  encryptedSelf?: string
}
