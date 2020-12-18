import { IccEntityrefApi, IccInsuranceApi } from "../icc-api"
import { IccUserXApi } from "./icc-user-x-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import { IccContactXApi } from "./icc-contact-x-api"
import { IccInvoiceXApi } from "./icc-invoice-x-api"
import { IccDocumentXApi } from "./icc-document-x-api"
import { IccHcpartyXApi } from "./icc-hcparty-x-api"
import { IccFormXApi } from "./icc-form-x-api"
import { IccHelementXApi } from "./icc-helement-x-api"
import { IccClassificationXApi } from "./icc-classification-x-api"
import { IccCalendarItemXApi } from "./icc-calendar-item-x-api"
import { IccPatientXApi } from "./icc-patient-x-api"
import { IccMessageXApi } from "./icc-message-x-api"
import { IccReceiptXApi } from "./icc-receipt-x-api"
import { IccAccesslogXApi } from "./icc-accesslog-x-api"
import { IccTimeTableXApi } from "./icc-time-table-x-api"
export * from "./icc-bekmehr-x-api"
export * from "./icc-calendar-item-x-api"
export * from "./icc-classification-x-api"
export * from "./icc-code-x-api"
export * from "./icc-contact-x-api"
export * from "./icc-crypto-x-api"
export * from "./icc-doctemplate-x-api"
export * from "./icc-document-x-api"
export * from "./icc-form-x-api"
export * from "./icc-hcparty-x-api"
export * from "./icc-helement-x-api"
export * from "./icc-invoice-x-api"
export * from "./icc-message-x-api"
export * from "./icc-patient-x-api"
export * from "./icc-user-x-api"
export * from "./icc-time-table-x-api"
export * from "./icc-receipt-x-api"
export { utils, UtilsClass } from "./crypto/utils"
export * from "./utils"
export declare const apiHeaders: (
  username: string,
  password: string
) => {
  Authorization: string
}
export declare const Api: (
  host: string,
  username: string,
  password: string,
  crypto?: Crypto,
  fetchImpl?: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
  storage?: Storage | undefined
) => {
  cryptoApi: IccCryptoXApi
  userApi: IccUserXApi
  patientApi: IccPatientXApi
  healthcarePartyApi: IccHcpartyXApi
  accessLogApi: IccAccesslogXApi
  contactApi: IccContactXApi
  healthcareElementApi: IccHelementXApi
  documentApi: IccDocumentXApi
  formApi: IccFormXApi
  invoiceApi: IccInvoiceXApi
  insuranceApi: IccInsuranceApi
  messageApi: IccMessageXApi
  entityReferenceApi: IccEntityrefApi
  receiptApi: IccReceiptXApi
  calendarItemApi: IccCalendarItemXApi
  classificationApi: IccClassificationXApi
  timetableApi: IccTimeTableXApi
}
