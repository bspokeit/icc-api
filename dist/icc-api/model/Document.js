"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const ModelHelper_1 = require("./ModelHelper")
class Document {
  constructor(json) {
    Object.assign(
      this,
      json,
      json.attachment ? { attachment: ModelHelper_1.decodeBase64(json.attachment) } : {}
    )
  }
}
exports.Document = Document
;(function(Document) {
  Document.DocumentLocationEnum = {
    Annex: "annex",
    Body: "body"
  }
  Document.DocumentTypeEnum = {
    Admission: "admission",
    Alert: "alert",
    BvtSample: "bvt_sample",
    Clinicalpath: "clinicalpath",
    Clinicalsummary: "clinicalsummary",
    Contactreport: "contactreport",
    Quote: "quote",
    Invoice: "invoice",
    Death: "death",
    Discharge: "discharge",
    Dischargereport: "dischargereport",
    EbirthBabyMedicalform: "ebirth_baby_medicalform",
    EbirthBabyNotification: "ebirth_baby_notification",
    EbirthMotherMedicalform: "ebirth_mother_medicalform",
    EbirthMotherNotification: "ebirth_mother_notification",
    EcareSafeConsultation: "ecare_safe_consultation",
    Epidemiology: "epidemiology",
    Intervention: "intervention",
    Labrequest: "labrequest",
    Labresult: "labresult",
    Medicaladvisoragreement: "medicaladvisoragreement",
    Medicationschemeelement: "medicationschemeelement",
    Note: "note",
    Notification: "notification",
    Pharmaceuticalprescription: "pharmaceuticalprescription",
    Prescription: "prescription",
    Productdelivery: "productdelivery",
    Quickdischargereport: "quickdischargereport",
    Radiationexposuremonitoring: "radiationexposuremonitoring",
    Referral: "referral",
    Report: "report",
    Request: "request",
    Result: "result",
    Sumehr: "sumehr",
    Telemonitoring: "telemonitoring",
    Template: "template",
    TemplateAdmin: "template_admin",
    Treatmentsuspension: "treatmentsuspension",
    Vaccination: "vaccination"
  }
  Document.DocumentStatusEnum = {
    Draft: "draft",
    Finalized: "finalized",
    PendingReview: "pending_review",
    Reviewed: "reviewed",
    PendingSignature: "pending_signature",
    Signed: "signed",
    Canceled: "canceled",
    Sent: "sent",
    Delivered: "delivered"
  }
})((Document = exports.Document || (exports.Document = {})))
//# sourceMappingURL=Document.js.map
