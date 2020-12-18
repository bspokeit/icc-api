import { IccCodeApi } from "../icc-api"
import { Code } from "../icc-api/model/Code"
export declare class IccCodeXApi extends IccCodeApi {
  icd10: any
  icpc2: any
  codeLanguages: any
  constructor(
    host: string,
    headers: {
      [key: string]: string
    },
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  )
  icdChapters(listOfCodes: Array<string>): Promise<any[]>
  icpcChapters(listOfCodes: Array<string>): Promise<any[]>
  languageForType(type: string, lng: string): string
  normalize(
    c: Code | string
  ):
    | {
        id: string
        type: string | undefined
        code: string | undefined
        version: string
      }
    | {
        id: string | undefined
        type: string
        code: string
        version: string
      }
}
