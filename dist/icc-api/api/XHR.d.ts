export declare namespace XHR {
  class Header {
    header: string
    data: string
    constructor(header: string, data: string)
  }
  class Data {
    statusCode: number
    contentType: string
    body: JSON | Array<JSON> | any
    constructor(status: number, contentType: string, body: JSON | Array<JSON> | any)
  }
  class XHRError extends Error {
    statusCode: number
    errorCode: string
    headers: Headers
    message: string
    url: string
    constructor(url: string, message: string, status: number, errorCode: string, headers: Headers)
  }
  function sendCommand(
    method: string,
    url: string,
    headers: Array<Header> | null,
    data?: string | any,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
    contentTypeOverride?: "application/json" | "text/plain" | "application/octet-stream"
  ): Promise<Data>
}
