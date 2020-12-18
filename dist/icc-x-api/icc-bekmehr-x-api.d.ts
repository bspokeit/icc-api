import * as models from "../icc-api/model/models"
import { IccAuthApi, IccBekmehrApi } from "../icc-api"
import { IccContactXApi } from "./icc-contact-x-api"
import { IccHelementXApi } from "./icc-helement-x-api"
export declare class IccBekmehrXApi extends IccBekmehrApi {
  private readonly ctcApi
  private readonly helementApi
  private readonly wssHost
  private readonly authApi
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    authApi: IccAuthApi,
    ctcApi: IccContactXApi,
    helementApi: IccHelementXApi,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  socketEventListener(
    socket: WebSocket,
    healthcarePartyId: string,
    resolve: (value?: Blob) => void,
    reject: (reason?: any) => void,
    progressCallback?: (progress: number) => void
  ): (event: MessageEvent) => void
  generateSmfExportWithEncryptionSupport(
    patientId: string,
    healthcarePartyId: string,
    language: string,
    body: models.SoftwareMedicalFileExport,
    progressCallback?: (progress: number) => void,
    sessionId?: string
  ): Promise<Blob>
  generateSumehrExportWithEncryptionSupport(
    patientId: string,
    healthcarePartyId: string,
    language: string,
    body: models.SumehrExportInfo,
    sessionId?: string
  ): Promise<Blob>
  generateSumehrV2ExportWithEncryptionSupport(
    patientId: string,
    healthcarePartyId: string,
    language: string,
    body: models.SumehrExportInfo,
    sessionId?: string
  ): Promise<Blob>
  generateDiaryNoteExportWithEncryptionSupport(
    patientId: string,
    healthcarePartyId: string,
    language: string,
    body: models.SumehrExportInfo,
    sessionId?: string
  ): Promise<Blob>
  generateMedicationSchemeWithEncryptionSupport(
    patientId: string,
    healthcarePartyId: string,
    language: string,
    recipientSafe: string,
    version: number,
    body: models.MedicationSchemeExportInfo,
    sessionId?: string
  ): Promise<Blob>
}
