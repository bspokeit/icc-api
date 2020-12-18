"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const icc_api_1 = require("../icc-api")
const utils_1 = require("./crypto/utils")
class IccBekmehrXApi extends icc_api_1.IccBekmehrApi {
  constructor(
    host,
    headers,
    authApi,
    ctcApi,
    helementApi,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    super(host, headers, fetchImpl)
    this.authApi = authApi
    this.ctcApi = ctcApi
    this.helementApi = helementApi
    this.wssHost = new URL(
      this.host,
      typeof window !== "undefined" ? window.location.href : undefined
    ).href
      .replace(/^http/, "ws")
      .replace(/\/rest\/v.+/, "/ws")
  }
  socketEventListener(socket, healthcarePartyId, resolve, reject, progressCallback) {
    const that = this
    const send = (command, uuid, body) => {
      const data = JSON.stringify({ command, uuid, body })
      socket.send(data.length > 65000 ? utils_1.utils.text2ua(data).buffer : data)
    }
    const messageHandler = msg => {
      if (msg.command === "decrypt") {
        if (msg.type === "Contact") {
          that.ctcApi
            .decrypt(healthcarePartyId, msg.body)
            .then(res => send("decryptResponse", msg.uuid, res))
        } else if (msg.type === "HealthElement") {
          that.helementApi
            .decrypt(healthcarePartyId, msg.body)
            .then(res => send("decryptResponse", msg.uuid, res))
        } else {
          that.ctcApi
            .decryptServices(healthcarePartyId, msg.body)
            .then(res => send("decryptResponse", msg.uuid, res))
        }
      } else if ((msg.command = "progress")) {
        if (progressCallback && msg.body && msg.body[0]) {
          progressCallback(msg.body[0].progress)
        }
      }
    }
    return event => {
      if (typeof event.data === "string") {
        const msg = JSON.parse(event.data)
        messageHandler(msg)
      } else {
        const blob = event.data
        var subBlob = blob.slice(0, 1)
        const br = new FileReader()
        br.onload = function(e) {
          const firstChar = e.target && new Uint8Array(e.target.result)[0]
          if (firstChar === 0x7b) {
            const tr = new FileReader()
            tr.onload = function(e) {
              const msg = e.target && JSON.parse(e.target.result)
              messageHandler(msg)
            }
            tr.readAsBinaryString(blob)
          } else {
            resolve(blob)
            socket.close(1000, "Ok")
          }
        }
        br.readAsArrayBuffer(subBlob)
      }
    }
  }
  generateSmfExportWithEncryptionSupport(
    patientId,
    healthcarePartyId,
    language,
    body,
    progressCallback,
    sessionId
  ) {
    return (!sessionId
      ? this.authApi.token("GET", "/ws/be_kmehr/generateSmf")
      : Promise.resolve("")
    ).then(
      token =>
        new Promise((resolve, reject) => {
          const socket = new WebSocket(
            token.length
              ? `${this.wssHost}/be_kmehr/generateSmf;tokenid=${token}`
              : `${this.wssHost}/be_kmehr/generateSmf;sessionid=${sessionId}`
          )
          socket.addEventListener("open", function() {
            socket.send(
              JSON.stringify({
                parameters: { patientId: patientId, language: language, info: body }
              })
            )
          })
          // Listen for messages
          socket.addEventListener(
            "message",
            this.socketEventListener(socket, healthcarePartyId, resolve, reject, progressCallback)
          )
        })
    )
  }
  generateSumehrExportWithEncryptionSupport(
    patientId,
    healthcarePartyId,
    language,
    body,
    sessionId
  ) {
    return (!sessionId
      ? this.authApi.token("GET", "/ws/be_kmehr/generateSumehr")
      : Promise.resolve("")
    ).then(
      token =>
        new Promise((resolve, reject) => {
          const socket = new WebSocket(
            token.length
              ? `${this.wssHost}/be_kmehr/generateSumehr;tokenid=${token}`
              : `${this.wssHost}/be_kmehr/generateSumehr;sessionid=${sessionId}`
          )
          socket.addEventListener("open", function() {
            socket.send(
              JSON.stringify({
                parameters: { patientId: patientId, language: language, info: body }
              })
            )
          })
          // Listen for messages
          socket.addEventListener(
            "message",
            this.socketEventListener(socket, healthcarePartyId, resolve, reject)
          )
        })
    )
  }
  generateSumehrV2ExportWithEncryptionSupport(
    patientId,
    healthcarePartyId,
    language,
    body,
    sessionId
  ) {
    return (!sessionId
      ? this.authApi.token("GET", "/ws/be_kmehr/generateSumehrV2")
      : Promise.resolve("")
    ).then(
      token =>
        new Promise((resolve, reject) => {
          const socket = new WebSocket(
            token.length
              ? `${this.wssHost}/be_kmehr/generateSumehrV2;tokenid=${token}`
              : `${this.wssHost}/be_kmehr/generateSumehrV2;sessionid=${sessionId}`
          )
          socket.addEventListener("open", function() {
            socket.send(
              JSON.stringify({
                parameters: { patientId: patientId, language: language, info: body }
              })
            )
          })
          // Listen for messages
          socket.addEventListener(
            "message",
            this.socketEventListener(socket, healthcarePartyId, resolve, reject)
          )
        })
    )
  }
  generateDiaryNoteExportWithEncryptionSupport(
    patientId,
    healthcarePartyId,
    language,
    body,
    sessionId
  ) {
    return (!sessionId
      ? this.authApi.token("GET", "/ws/be_kmehr/generateDiaryNote")
      : Promise.resolve("")
    ).then(
      token =>
        new Promise((resolve, reject) => {
          const socket = new WebSocket(
            token.length
              ? `${this.wssHost}/be_kmehr/generateDiaryNote;tokenid=${token}`
              : `${this.wssHost}/be_kmehr/generateDiaryNote;sessionid=${sessionId}`
          )
          socket.addEventListener("open", function() {
            socket.send(
              JSON.stringify({
                parameters: { patientId: patientId, language: language, info: body }
              })
            )
          })
          // Listen for messages
          socket.addEventListener(
            "message",
            this.socketEventListener(socket, healthcarePartyId, resolve, reject)
          )
        })
    )
  }
  generateMedicationSchemeWithEncryptionSupport(
    patientId,
    healthcarePartyId,
    language,
    recipientSafe,
    version,
    body,
    sessionId
  ) {
    return (!sessionId
      ? this.authApi.token("GET", "/ws/be_kmehr/generateMedicationScheme")
      : Promise.resolve("")
    ).then(
      token =>
        new Promise((resolve, reject) => {
          const socket = new WebSocket(
            token.length
              ? `${this.wssHost}/be_kmehr/generateMedicationScheme;tokenid=${token}`
              : `${this.wssHost}/be_kmehr/generateMedicationScheme;sessionid=${sessionId}`
          )
          socket.addEventListener("open", function() {
            socket.send(
              JSON.stringify({
                parameters: {
                  patientId: patientId,
                  language: language,
                  recipientSafe: recipientSafe,
                  version: version,
                  info: body
                }
              })
            )
          })
          // Listen for messages
          socket.addEventListener(
            "message",
            this.socketEventListener(socket, healthcarePartyId, resolve, reject)
          )
        })
    )
  }
}
exports.IccBekmehrXApi = IccBekmehrXApi
//# sourceMappingURL=icc-bekmehr-x-api.js.map
