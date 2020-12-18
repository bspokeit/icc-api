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
import { PaginatedDocumentKeyIdPairObject } from "./PaginatedDocumentKeyIdPairObject"
import { User } from "./User"
export declare class PaginatedListUser {
  constructor(json: JSON | any)
  pageSize?: number
  totalSize?: number
  rows?: Array<User>
  nextKeyPair?: PaginatedDocumentKeyIdPairObject
}
