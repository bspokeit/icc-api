"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
/**
 * iCure Cloud API Documentation
 * Spring shop sample application
 *
 * OpenAPI spec version: v0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
const XHR_1 = require("./XHR")
const ApplicationSettings_1 = require("../model/ApplicationSettings")
class IccApplicationsettingsApi {
  constructor(host, headers, fetchImpl) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR_1.XHR.Header(k, headers[k]))
    this.fetchImpl = fetchImpl
  }
  setHeaders(h) {
    this.headers = h
  }
  handleError(e) {
    throw e
  }
  /**
   *
   * @summary Gets all application settings
   */
  getApplicationSettings() {
    let _body = null
    const _url = this.host + `/appsettings` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new ApplicationSettings_1.ApplicationSettings(it)))
      .catch(err => this.handleError(err))
  }
}
exports.IccApplicationsettingsApi = IccApplicationsettingsApi
//# sourceMappingURL=IccApplicationsettingsApi.js.map
