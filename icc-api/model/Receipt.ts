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
import { CodeStub } from "./CodeStub"
import { Delegation } from "./Delegation"

import { decodeBase64 } from "./ModelHelper"

export class Receipt {
  constructor(json: JSON | any) {
    Object.assign(this as Receipt, json)
  }

  id?: string
  rev?: string
  created?: number
  modified?: number
  author?: string
  responsible?: string
  medicalLocationId?: string
  tags?: Array<CodeStub>
  codes?: Array<CodeStub>
  endOfLife?: number
  deletionDate?: number
  attachmentIds?: { [key: string]: string }
  references?: Array<string>
  documentId?: string
  category?: string
  subCategory?: string
  secretForeignKeys?: Array<string>
  cryptedForeignKeys?: { [key: string]: Array<Delegation> }
  delegations?: { [key: string]: Array<Delegation> }
  encryptionKeys?: { [key: string]: Array<Delegation> }
  encryptedSelf?: string
}