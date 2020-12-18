"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class Reimbursement {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.Reimbursement = Reimbursement
;(function(Reimbursement) {
  Reimbursement.DeliveryEnvironmentEnum = {
    P: "P",
    A: "A",
    H: "H",
    R: "R"
  }
  Reimbursement.CodeTypeEnum = {
    CNK: "CNK",
    PSEUDO: "PSEUDO"
  }
  Reimbursement.MultipleEnum = {
    M: "M",
    V: "V"
  }
})((Reimbursement = exports.Reimbursement || (exports.Reimbursement = {})))
//# sourceMappingURL=Reimbursement.js.map
