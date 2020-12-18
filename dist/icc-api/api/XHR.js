"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, "__esModule", { value: true })
var XHR
;(function(XHR) {
  class Header {
    constructor(header, data) {
      this.header = header
      this.data = data
    }
  }
  XHR.Header = Header
  class Data {
    constructor(status, contentType, body) {
      this.statusCode = status
      this.contentType = contentType
      this.body = body
    }
  }
  XHR.Data = Data
  class XHRError extends Error {
    constructor(url, message, status, errorCode, headers) {
      super(message)
      this.url = url
      this.statusCode = status
      this.message = message
      this.errorCode = errorCode
      this.headers = headers
    }
  }
  XHR.XHRError = XHRError
  function fetchWithTimeout(
    url,
    init,
    timeout = 10000,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    return new Promise((resolve, reject) => {
      // Set timeout timer
      let timer = setTimeout(
        () => reject({ message: "Request timed out", status: "Request timed out" }),
        timeout
      )
      fetchImpl(url, init)
        .then(response => {
          clearTimeout(timer)
          resolve(response)
        })
        .catch(err => {
          clearTimeout(timer)
          reject(err)
        })
    })
  }
  function sendCommand(
    method,
    url,
    headers,
    data = "",
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch,
    contentTypeOverride
  ) {
    const contentType =
      headers &&
      headers.find(it => (it.header ? it.header.toLowerCase() === "content-type" : false))
    const clientTimeout =
      headers &&
      headers.find(it => (it.header ? it.header.toUpperCase() === "X-CLIENT-SIDE-TIMEOUT" : false))
    const timeout = clientTimeout ? Number(clientTimeout.data) : 600000
    return fetchWithTimeout(
      url,
      Object.assign(
        {
          method: method,
          credentials: "include",
          headers:
            (headers &&
              headers
                .filter(
                  h =>
                    (h.header.toLowerCase() !== "content-type" ||
                      h.data !== "multipart/form-data") &&
                    h.header.toUpperCase() !== "X-CLIENT-SIDE-TIMEOUT"
                )
                .reduce((acc, h) => {
                  acc[h.header] = h.data
                  return acc
                }, {})) ||
            {}
        },
        method === "POST" || method === "PUT"
          ? {
              body:
                !contentType || contentType.data === "application/json"
                  ? JSON.stringify(data, (k, v) => {
                      return v instanceof ArrayBuffer || v instanceof Uint8Array
                        ? btoa(new Uint8Array(v).reduce((d, b) => d + String.fromCharCode(b), ""))
                        : v
                    })
                  : data
            }
          : {}
      ),
      timeout,
      fetchImpl
    ).then(function(response) {
      return __awaiter(this, void 0, void 0, function*() {
        if (response.status >= 400) {
          const error = yield response.json()
          throw new XHRError(url, error.message, error.status, error.error, response.headers)
        }
        const ct = contentTypeOverride || response.headers.get("content-type") || "text/plain"
        return (ct.startsWith("application/json")
          ? response.json()
          : ct.startsWith("application/xml") || ct.startsWith("text/")
            ? response.text()
            : response.arrayBuffer()
        ).then(d => new Data(response.status, ct, d))
      })
    })
  }
  XHR.sendCommand = sendCommand
})((XHR = exports.XHR || (exports.XHR = {})))
//# sourceMappingURL=XHR.js.map
