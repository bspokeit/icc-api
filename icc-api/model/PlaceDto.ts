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
import { AddressDto } from "./AddressDto"

import { decodeBase64 } from "./ModelHelper"

export class PlaceDto {
  constructor(json: JSON | any) {
    Object.assign(this as PlaceDto, json)
  }

  id?: string
  rev?: string
  deletionDate?: number
  name?: string
  address?: AddressDto
}
