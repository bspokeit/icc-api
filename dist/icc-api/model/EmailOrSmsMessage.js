"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class EmailOrSmsMessage {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.EmailOrSmsMessage = EmailOrSmsMessage
;(function(EmailOrSmsMessage) {
  EmailOrSmsMessage.TypeEnum = {
    EMAIL: "EMAIL",
    SMS: "SMS"
  }
})((EmailOrSmsMessage = exports.EmailOrSmsMessage || (exports.EmailOrSmsMessage = {})))
//# sourceMappingURL=EmailOrSmsMessage.js.map
