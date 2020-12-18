"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const ModelHelper_1 = require("./ModelHelper")
class Patient {
  constructor(json) {
    Object.assign(
      this,
      json,
      json.picture ? { picture: ModelHelper_1.decodeBase64(json.picture) } : {}
    )
  }
}
exports.Patient = Patient
;(function(Patient) {
  Patient.GenderEnum = {
    M: "M",
    F: "F",
    I: "I",
    C: "C",
    Y: "Y",
    X: "X",
    U: "U"
  }
  Patient.DeactivationReasonEnum = {
    Deceased: "deceased",
    Moved: "moved",
    OtherDoctor: "other_doctor",
    Retired: "retired",
    NoContact: "no_contact",
    Unknown: "unknown",
    None: "none"
  }
  Patient.PersonalStatusEnum = {
    Single: "single",
    InCouple: "in_couple",
    Married: "married",
    Separated: "separated",
    Divorced: "divorced",
    Divorcing: "divorcing",
    Widowed: "widowed",
    Widower: "widower",
    Complicated: "complicated",
    Unknown: "unknown",
    Contract: "contract",
    Other: "other"
  }
})((Patient = exports.Patient || (exports.Patient = {})))
//# sourceMappingURL=Patient.js.map
