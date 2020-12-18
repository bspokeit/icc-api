"use strict"
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p]
}
Object.defineProperty(exports, "__esModule", { value: true })
const icc_api_1 = require("../icc-api")
const icc_user_x_api_1 = require("./icc-user-x-api")
const icc_crypto_x_api_1 = require("./icc-crypto-x-api")
const icc_contact_x_api_1 = require("./icc-contact-x-api")
const icc_invoice_x_api_1 = require("./icc-invoice-x-api")
const icc_document_x_api_1 = require("./icc-document-x-api")
const icc_hcparty_x_api_1 = require("./icc-hcparty-x-api")
const icc_form_x_api_1 = require("./icc-form-x-api")
const icc_helement_x_api_1 = require("./icc-helement-x-api")
const icc_classification_x_api_1 = require("./icc-classification-x-api")
const icc_calendar_item_x_api_1 = require("./icc-calendar-item-x-api")
const icc_patient_x_api_1 = require("./icc-patient-x-api")
const icc_message_x_api_1 = require("./icc-message-x-api")
const icc_receipt_x_api_1 = require("./icc-receipt-x-api")
const icc_accesslog_x_api_1 = require("./icc-accesslog-x-api")
const icc_time_table_x_api_1 = require("./icc-time-table-x-api")
__export(require("./icc-bekmehr-x-api"))
__export(require("./icc-calendar-item-x-api"))
__export(require("./icc-classification-x-api"))
__export(require("./icc-code-x-api"))
__export(require("./icc-contact-x-api"))
__export(require("./icc-crypto-x-api"))
__export(require("./icc-doctemplate-x-api"))
__export(require("./icc-document-x-api"))
__export(require("./icc-form-x-api"))
__export(require("./icc-hcparty-x-api"))
__export(require("./icc-helement-x-api"))
__export(require("./icc-invoice-x-api"))
__export(require("./icc-message-x-api"))
__export(require("./icc-patient-x-api"))
__export(require("./icc-user-x-api"))
__export(require("./icc-time-table-x-api"))
__export(require("./icc-receipt-x-api"))
var utils_1 = require("./crypto/utils")
exports.utils = utils_1.utils
exports.UtilsClass = utils_1.UtilsClass
__export(require("./utils"))
exports.apiHeaders = function(username, password) {
  return {
    Authorization: `Basic ${
      typeof btoa !== "undefined"
        ? btoa(`${username}:${password}`)
        : Buffer.from(`${username}:${password}`).toString("base64")
    }`
  }
}
exports.Api = function(
  host,
  username,
  password,
  crypto = typeof window !== "undefined"
    ? window.crypto
    : typeof self !== "undefined"
      ? self.crypto
      : {},
  fetchImpl = typeof window !== "undefined"
    ? window.fetch
    : typeof self !== "undefined"
      ? self.fetch
      : fetch,
  storage
) {
  const headers = exports.apiHeaders(username, password)
  const authApi = new icc_api_1.IccAuthApi(host, headers, fetchImpl)
  const entityReferenceApi = new icc_api_1.IccEntityrefApi(host, headers, fetchImpl)
  const userApi = new icc_user_x_api_1.IccUserXApi(host, headers, fetchImpl)
  const healthcarePartyApi = new icc_hcparty_x_api_1.IccHcpartyXApi(host, headers, fetchImpl)
  const cryptoApi = new icc_crypto_x_api_1.IccCryptoXApi(
    host,
    headers,
    healthcarePartyApi,
    new icc_api_1.IccPatientApi(host, headers, fetchImpl),
    crypto,
    storage
  )
  const accessLogApi = new icc_accesslog_x_api_1.IccAccesslogXApi(
    host,
    headers,
    cryptoApi,
    fetchImpl
  )
  const contactApi = new icc_contact_x_api_1.IccContactXApi(host, headers, cryptoApi, fetchImpl)
  const formApi = new icc_form_x_api_1.IccFormXApi(host, headers, cryptoApi, fetchImpl)
  const invoiceApi = new icc_invoice_x_api_1.IccInvoiceXApi(
    host,
    headers,
    cryptoApi,
    entityReferenceApi,
    fetchImpl
  )
  const insuranceApi = new icc_api_1.IccInsuranceApi(host, headers, fetchImpl)
  const documentApi = new icc_document_x_api_1.IccDocumentXApi(
    host,
    headers,
    cryptoApi,
    authApi,
    fetchImpl
  )
  const healthcareElementApi = new icc_helement_x_api_1.IccHelementXApi(
    host,
    headers,
    cryptoApi,
    fetchImpl
  )
  const classificationApi = new icc_classification_x_api_1.IccClassificationXApi(
    host,
    headers,
    cryptoApi,
    fetchImpl
  )
  const calendarItemApi = new icc_calendar_item_x_api_1.IccCalendarItemXApi(
    host,
    headers,
    cryptoApi,
    fetchImpl
  )
  const receiptApi = new icc_receipt_x_api_1.IccReceiptXApi(host, headers, cryptoApi, fetchImpl)
  const timetableApi = new icc_time_table_x_api_1.IccTimeTableXApi(
    host,
    headers,
    cryptoApi,
    fetchImpl
  )
  const patientApi = new icc_patient_x_api_1.IccPatientXApi(
    host,
    headers,
    cryptoApi,
    contactApi,
    formApi,
    healthcareElementApi,
    invoiceApi,
    documentApi,
    healthcarePartyApi,
    classificationApi,
    calendarItemApi,
    ["note"],
    fetchImpl
  )
  const messageApi = new icc_message_x_api_1.IccMessageXApi(
    host,
    headers,
    cryptoApi,
    insuranceApi,
    entityReferenceApi,
    invoiceApi,
    documentApi,
    receiptApi,
    patientApi,
    fetchImpl
  )
  return {
    cryptoApi,
    userApi,
    patientApi,
    healthcarePartyApi,
    accessLogApi,
    contactApi,
    healthcareElementApi,
    documentApi,
    formApi,
    invoiceApi,
    insuranceApi,
    messageApi,
    entityReferenceApi,
    receiptApi,
    calendarItemApi,
    classificationApi,
    timetableApi
  }
}
//# sourceMappingURL=index.js.map
