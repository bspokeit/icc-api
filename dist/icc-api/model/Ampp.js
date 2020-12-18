"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class Ampp {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.Ampp = Ampp
;(function(Ampp) {
  Ampp.StatusEnum = {
    AUTHORIZED: "AUTHORIZED",
    SUSPENDED: "SUSPENDED",
    REVOKED: "REVOKED"
  }
})((Ampp = exports.Ampp || (exports.Ampp = {})))
//# sourceMappingURL=Ampp.js.map
