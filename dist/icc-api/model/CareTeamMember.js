"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
class CareTeamMember {
  constructor(json) {
    Object.assign(this, json)
  }
}
exports.CareTeamMember = CareTeamMember
;(function(CareTeamMember) {
  CareTeamMember.CareTeamMemberTypeEnum = {
    Physician: "physician",
    Specialist: "specialist",
    Other: "other"
  }
})((CareTeamMember = exports.CareTeamMember || (exports.CareTeamMember = {})))
//# sourceMappingURL=CareTeamMember.js.map
