"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const ModelHelper_1 = require("./ModelHelper")
class HealthcareParty {
  constructor(json) {
    Object.assign(
      this,
      json,
      json.picture ? { picture: ModelHelper_1.decodeBase64(json.picture) } : {}
    )
  }
}
exports.HealthcareParty = HealthcareParty
;(function(HealthcareParty) {
  HealthcareParty.GenderEnum = {
    M: "M",
    F: "F",
    I: "I",
    C: "C",
    Y: "Y",
    X: "X",
    U: "U"
  }
  HealthcareParty.StatusesEnum = {
    Trainee: "trainee",
    Withconvention: "withconvention",
    Accreditated: "accreditated"
  }
})((HealthcareParty = exports.HealthcareParty || (exports.HealthcareParty = {})))
//# sourceMappingURL=HealthcareParty.js.map
