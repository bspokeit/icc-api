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
export declare class FrontEndMigration {
  constructor(json: JSON | any)
  id?: string
  rev?: string
  deletionDate?: number
  name?: string
  startDate?: number
  endDate?: number
  status?: FrontEndMigration.StatusEnum
  logs?: string
  userId?: string
  startKey?: string
  startKeyDocId?: string
  processCount?: number
}
export declare namespace FrontEndMigration {
  type StatusEnum = "STARTED" | "ERROR" | "SUCCESS"
  const StatusEnum: {
    STARTED: StatusEnum
    ERROR: StatusEnum
    SUCCESS: StatusEnum
  }
}
