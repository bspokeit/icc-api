"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class Amp {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.Amp = Amp
;(function(Amp) {
  Amp.StatusEnum = {
    AUTHORIZED: "AUTHORIZED",
    SUSPENDED: "SUSPENDED",
    REVOKED: "REVOKED"
  }
  Amp.MedicineTypeEnum = {
    ALLOPATHIC: "ALLOPATHIC",
    HOMEOPATHIC: "HOMEOPATHIC"
  }
})((Amp = exports.Amp || (exports.Amp = {})))
//# sourceMappingURL=Amp.js.map
