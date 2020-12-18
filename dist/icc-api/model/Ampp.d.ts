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
import { AmppComponent } from "./AmppComponent"
import { Atc } from "./Atc"
import { Commercialization } from "./Commercialization"
import { Company } from "./Company"
import { Dmpp } from "./Dmpp"
import { Quantity } from "./Quantity"
import { SamText } from "./SamText"
import { SupplyProblem } from "./SupplyProblem"
export declare class Ampp {
  constructor(json: JSON | any)
  from?: number
  to?: number
  index?: number
  ctiExtended?: string
  orphan?: boolean
  leafletLink?: SamText
  spcLink?: SamText
  rmaPatientLink?: SamText
  rmaProfessionalLink?: SamText
  parallelCircuit?: number
  parallelDistributor?: string
  packMultiplier?: number
  packAmount?: Quantity
  packDisplayValue?: string
  status?: Ampp.StatusEnum
  atcs?: Array<Atc>
  crmLink?: SamText
  deliveryModusCode?: string
  deliveryModus?: SamText
  deliveryModusSpecification?: SamText
  dhpcLink?: SamText
  distributorCompany?: Company
  singleUse?: boolean
  speciallyRegulated?: number
  abbreviatedName?: SamText
  prescriptionName?: SamText
  note?: SamText
  posologyNote?: SamText
  noGenericPrescriptionReasons?: Array<SamText>
  exFactoryPrice?: number
  reimbursementCode?: number
  definedDailyDose?: Quantity
  officialExFactoryPrice?: number
  realExFactoryPrice?: number
  pricingInformationDecisionDate?: number
  components?: Array<AmppComponent>
  commercializations?: Array<Commercialization>
  supplyProblems?: Array<SupplyProblem>
  dmpps?: Array<Dmpp>
  vaccineIndicationCodes?: Array<string>
}
export declare namespace Ampp {
  type StatusEnum = "AUTHORIZED" | "SUSPENDED" | "REVOKED"
  const StatusEnum: {
    AUTHORIZED: StatusEnum
    SUSPENDED: StatusEnum
    REVOKED: StatusEnum
  }
}
