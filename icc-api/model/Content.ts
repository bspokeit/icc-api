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
import { Measure } from "./Measure"
import { Medication } from "./Medication"
import { Service } from "./Service"

import { decodeBase64 } from "./ModelHelper"

export class Content {
  constructor(json: JSON | any) {
    Object.assign(
      this as Content,
      json,
      json.binaryValue ? { binaryValue: decodeBase64(json.binaryValue) } : {}
    )
  }

  stringValue?: string
  numberValue?: number
  booleanValue?: boolean
  instantValue?: number
  fuzzyDateValue?: number
  binaryValue?: ArrayBuffer
  documentId?: string
  measureValue?: Measure
  medicationValue?: Medication
  compoundValue?: Array<Service>
}