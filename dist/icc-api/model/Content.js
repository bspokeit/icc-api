"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const ModelHelper_1 = require("./ModelHelper")
class Content {
  constructor(json) {
    Object.assign(
      this,
      json,
      json.binaryValue ? { binaryValue: ModelHelper_1.decodeBase64(json.binaryValue) } : {}
    )
  }
}
exports.Content = Content
//# sourceMappingURL=Content.js.map
