"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const icc_api_1 = require("../icc-api")
const lodash_1 = require("lodash")
// noinspection JSUnusedGlobalSymbols
class IccDoctemplateXApi extends icc_api_1.IccDoctemplateApi {
  constructor(
    host,
    headers,
    crypto,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    super(host, headers, fetchImpl)
    this.crypto = crypto
    this.fetchImpl = fetchImpl
  }
  newInstance(user, template, c) {
    return new Promise((resolve, reject) => {
      const documentTemplate = lodash_1.extend(
        {
          id: this.crypto.randomUuid(),
          _type: "org.taktik.icure.entities.DocumentTemplate",
          owner: user.id,
          created: new Date().getTime(),
          modified: new Date().getTime(),
          guid: this.crypto.randomUuid(),
          group: null,
          specialty: null,
          attachment: this.crypto.utils.text2ua(template),
          mainUti: "public.plain-text"
        },
        c || {}
      )
      if (documentTemplate.group && documentTemplate.group.guid == null) {
        documentTemplate.group.guid = this.crypto.randomUuid()
      }
      //sauver l doctemplate vide
      if (template) {
        //save attachement
      }
      return resolve(documentTemplate)
    })
  }
  // noinspection JSUnusedLocalSymbols
  findAllByOwnerId(ownerId) {
    return new Promise(function(resolve, reject) {
      reject(console.log("findByHCPartyPatientSecretFKeys not implemented in document API!"))
    })
  }
  // noinspection JSUnusedGlobalSymbols
  getAttachmentUrl(documentId, attachmentId) {
    return (
      this.host +
      "/doctemplate/{documentId}/attachment/{attachmentId}"
        .replace("{documentId}", documentId)
        .replace("{attachmentId}", attachmentId)
    )
  }
}
exports.IccDoctemplateXApi = IccDoctemplateXApi
//# sourceMappingURL=icc-doctemplate-x-api.js.map
