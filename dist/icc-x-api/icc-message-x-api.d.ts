import { IccEntityrefApi, IccInsuranceApi, IccMessageApi } from "../icc-api"
import { IccCryptoXApi } from "./icc-crypto-x-api"
import { IccDocumentXApi } from "./icc-document-x-api"
import { IccInvoiceXApi } from "./icc-invoice-x-api"
import { Patient, User } from "../icc-api/model/models"
import { IccReceiptXApi } from "./icc-receipt-x-api"
import { IccPatientXApi } from "./icc-patient-x-api"
export declare class IccMessageXApi extends IccMessageApi {
  private crypto
  private insuranceApi
  private entityReferenceApi
  private receiptXApi
  private invoiceXApi
  private documentXApi
  private patientApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    crypto: IccCryptoXApi,
    insuranceApi: IccInsuranceApi,
    entityReferenceApi: IccEntityrefApi,
    invoiceXApi: IccInvoiceXApi,
    documentXApi: IccDocumentXApi,
    receiptXApi: IccReceiptXApi,
    patientApi: IccPatientXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  newInstance(user: User, m: any): Promise<any>
  newInstanceWithPatient(user: User, patient: Patient | null, m: any): Promise<any>
}
