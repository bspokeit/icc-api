"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class Address {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.Address = Address
;(function(Address) {
  Address.AddressTypeEnum = {
    Home: "home",
    Work: "work",
    Vacation: "vacation",
    Hospital: "hospital",
    Clinic: "clinic",
    Hq: "hq",
    Other: "other"
  }
})((Address = exports.Address || (exports.Address = {})))
//# sourceMappingURL=Address.js.map
