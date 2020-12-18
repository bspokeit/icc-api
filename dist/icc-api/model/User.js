"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class User {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.User = User
;(function(User) {
  User.TypeEnum = {
    Database: "database",
    Ldap: "ldap",
    Token: "token"
  }
  User.StatusEnum = {
    ACTIVE: "ACTIVE",
    DISABLED: "DISABLED",
    REGISTERING: "REGISTERING"
  }
})((User = exports.User || (exports.User = {})))
//# sourceMappingURL=User.js.map
