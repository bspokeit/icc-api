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

import { decodeBase64 } from "./ModelHelper"

export class MeasureDto {
  constructor(json: JSON | any) {
    Object.assign(this as MeasureDto, json)
  }

  value?: number
  min?: number
  max?: number
  ref?: number
  severity?: number
  severityCode?: string
  unit?: string
  unitCodes?: Array<CodeStubDto>
  comment?: string
}
