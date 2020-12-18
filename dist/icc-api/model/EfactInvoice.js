"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class EfactInvoice {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.EfactInvoice = EfactInvoice
;(function(EfactInvoice) {
  EfactInvoice.ReasonEnum = {
    Chimiotherapy: "Chimiotherapy",
    ProfessionalDisease: "ProfessionalDisease",
    WorkAccident: "WorkAccident",
    Accident: "Accident",
    Other: "Other"
  }
})((EfactInvoice = exports.EfactInvoice || (exports.EfactInvoice = {})))
//# sourceMappingURL=EfactInvoice.js.map
