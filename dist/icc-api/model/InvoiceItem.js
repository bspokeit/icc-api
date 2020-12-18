"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class InvoiceItem {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.InvoiceItem = InvoiceItem
;(function(InvoiceItem) {
  InvoiceItem.SideCodeEnum = {
    None: "None",
    Left: "Left",
    Right: "Right"
  }
  InvoiceItem.TimeOfDayEnum = {
    Other: "Other",
    Night: "Night",
    Weekend: "Weekend",
    Bankholiday: "Bankholiday",
    Urgent: "Urgent"
  }
  InvoiceItem.DerogationMaxNumberEnum = {
    Other: "Other",
    DerogationMaxNumber: "DerogationMaxNumber",
    OtherPrescription: "OtherPrescription",
    SecondPrestationOfDay: "SecondPrestationOfDay",
    ThirdAndNextPrestationOfDay: "ThirdAndNextPrestationOfDay"
  }
  InvoiceItem.PrescriberNormEnum = {
    None: "None",
    OnePrescriber: "OnePrescriber",
    SelfPrescriber: "SelfPrescriber",
    AddedCode: "AddedCode",
    ManyPrescribers: "ManyPrescribers"
  }
  InvoiceItem.PercentNormEnum = {
    None: "None",
    SurgicalAid1: "SurgicalAid1",
    SurgicalAid2: "SurgicalAid2",
    ReducedFee: "ReducedFee",
    Ah1n1: "Ah1n1",
    HalfPriceSecondAct: "HalfPriceSecondAct",
    InvoiceException: "InvoiceException",
    ForInformation: "ForInformation"
  }
})((InvoiceItem = exports.InvoiceItem || (exports.InvoiceItem = {})))
//# sourceMappingURL=InvoiceItem.js.map
