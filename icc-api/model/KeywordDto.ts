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
import { KeywordSubwordDto } from "./KeywordSubwordDto"

import { decodeBase64 } from "./ModelHelper"

export class KeywordDto {
  constructor(json: JSON | any) {
    Object.assign(this as KeywordDto, json)
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
  deletionDate?: number
  value?: string
  subWords?: Array<KeywordSubwordDto>
  userId?: string
}
