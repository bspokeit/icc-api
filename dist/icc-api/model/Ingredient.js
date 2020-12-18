"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class Ingredient {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.Ingredient = Ingredient
;(function(Ingredient) {
  Ingredient.TypeEnum = {
    ACTIVESUBSTANCE: "ACTIVE_SUBSTANCE",
    EXCIPIENT: "EXCIPIENT"
  }
})((Ingredient = exports.Ingredient || (exports.Ingredient = {})))
//# sourceMappingURL=Ingredient.js.map
