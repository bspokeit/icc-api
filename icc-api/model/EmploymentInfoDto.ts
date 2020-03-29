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
import { EmployerDto } from "./EmployerDto"

export class EmploymentInfoDto {
  constructor(json: JSON | any) {
    Object.assign(this as EmploymentInfoDto, json)
  }

  startDate?: number
  endDate?: number
  professionType?: CodeStub
  employer?: EmployerDto
}
