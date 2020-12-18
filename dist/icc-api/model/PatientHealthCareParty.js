"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class PatientHealthCareParty {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.PatientHealthCareParty = PatientHealthCareParty
;(function(PatientHealthCareParty) {
  PatientHealthCareParty.TypeEnum = {
    Doctor: "doctor",
    Referral: "referral",
    Medicalhouse: "medicalhouse",
    Retirementhome: "retirementhome",
    Hospital: "hospital",
    Other: "other",
    Referringphysician: "referringphysician"
  }
})(
  (PatientHealthCareParty = exports.PatientHealthCareParty || (exports.PatientHealthCareParty = {}))
)
//# sourceMappingURL=PatientHealthCareParty.js.map
