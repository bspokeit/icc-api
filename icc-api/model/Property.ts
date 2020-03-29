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
import { Attachment } from "./Attachment"
import { PropertyType } from "./PropertyType"
import { RevisionInfo } from "./RevisionInfo"
import { TypedValue } from "./TypedValue"

export class Property {
  constructor(json: JSON | any) {
    Object.assign(this as Property, json)
  }

  type?: PropertyType
  typedValue?: TypedValue
  attachments?: { [key: string]: Attachment }
  deleted?: number
  id?: string
  rev?: string
  revsInfo?: Array<RevisionInfo>
  conflicts?: Array<string>
  javaType?: string
  revHistory?: { [key: string]: string }
}
