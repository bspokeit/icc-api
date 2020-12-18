"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class Invoice {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.Invoice = Invoice
;(function(Invoice) {
  Invoice.InvoiceTypeEnum = {
    Patient: "patient",
    Mutualfund: "mutualfund",
    Payingagency: "payingagency",
    Insurance: "insurance",
    Efact: "efact",
    Other: "other"
  }
  Invoice.SentMediumTypeEnum = {
    Cdrom: "cdrom",
    Eattest: "eattest",
    Efact: "efact",
    Email: "email",
    Mediprima: "mediprima",
    Paper: "paper"
  }
  Invoice.InterventionTypeEnum = {
    Total: "total",
    Userfees: "userfees"
  }
  Invoice.PaymentTypeEnum = {
    Cash: "cash",
    Wired: "wired",
    Insurance: "insurance",
    Creditcard: "creditcard",
    Debitcard: "debitcard",
    Paypal: "paypal",
    Bitcoin: "bitcoin",
    Other: "other"
  }
})((Invoice = exports.Invoice || (exports.Invoice = {})))
//# sourceMappingURL=Invoice.js.map
