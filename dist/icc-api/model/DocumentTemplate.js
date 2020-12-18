"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const ModelHelper_1 = require("./ModelHelper")
class DocumentTemplate {
  constructor(json) {
    Object.assign(
      this,
      json,
      json.attachment ? { attachment: ModelHelper_1.decodeBase64(json.attachment) } : {}
    )
  }
}
exports.DocumentTemplate = DocumentTemplate
;(function(DocumentTemplate) {
  DocumentTemplate.VersionEnum = {
    _0: "V1_0_0"
  }
})((DocumentTemplate = exports.DocumentTemplate || (exports.DocumentTemplate = {})))
//# sourceMappingURL=DocumentTemplate.js.map
