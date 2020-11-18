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
import { NoGenericPrescriptionReasonDto } from "./NoGenericPrescriptionReasonDto"
import { NoSwitchReasonDto } from "./NoSwitchReasonDto"
import { SamTextDto } from "./SamTextDto"

import { decodeBase64 } from "./ModelHelper"

export class VmpGroupDto {
  constructor(json: JSON | any) {
    Object.assign(this as VmpGroupDto, json)
  }

  id?: string
  rev?: string
  deletionDate?: number
  from?: number
  to?: number
  productId?: string
  code?: string
  name?: SamTextDto
  noGenericPrescriptionReason?: NoGenericPrescriptionReasonDto
  noSwitchReason?: NoSwitchReasonDto
}