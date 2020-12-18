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
const CalendarItem_1 = require("../model/CalendarItem")
const DocIdentifier_1 = require("../model/DocIdentifier")
class IccCalendarItemApi {
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
   * @summary Creates a calendarItem
   * @param body
   */
  createCalendarItem(body) {
    let _body = null
    _body = body
    const _url = this.host + `/calendarItem` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => new CalendarItem_1.CalendarItem(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Deletes an calendarItem
   * @param calendarItemIds
   */
  deleteCalendarItem(calendarItemIds) {
    let _body = null
    const _url =
      this.host +
      `/calendarItem/${encodeURIComponent(String(calendarItemIds))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new DocIdentifier_1.DocIdentifier(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Find CalendarItems by hcparty and patient
   * @param hcPartyId
   * @param secretFKeys
   */
  findCalendarItemsByHCPartyPatientForeignKeys(hcPartyId, secretFKeys) {
    let _body = null
    const _url =
      this.host +
      `/calendarItem/byHcPartySecretForeignKeys` +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + encodeURIComponent(String(hcPartyId)) : "") +
      (secretFKeys ? "&secretFKeys=" + encodeURIComponent(String(secretFKeys)) : "")
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new CalendarItem_1.CalendarItem(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Gets an calendarItem
   * @param calendarItemId
   */
  getCalendarItem(calendarItemId) {
    let _body = null
    const _url =
      this.host +
      `/calendarItem/${encodeURIComponent(String(calendarItemId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new CalendarItem_1.CalendarItem(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Gets all calendarItems
   */
  getCalendarItems() {
    let _body = null
    const _url = this.host + `/calendarItem` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new CalendarItem_1.CalendarItem(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Get CalendarItems by Period and HcPartyId
   * @param startDate
   * @param endDate
   * @param hcPartyId
   */
  getCalendarItemsByPeriodAndHcPartyId(startDate, endDate, hcPartyId) {
    let _body = null
    const _url =
      this.host +
      `/calendarItem/byPeriodAndHcPartyId` +
      "?ts=" +
      new Date().getTime() +
      (startDate ? "&startDate=" + encodeURIComponent(String(startDate)) : "") +
      (endDate ? "&endDate=" + encodeURIComponent(String(endDate)) : "") +
      (hcPartyId ? "&hcPartyId=" + encodeURIComponent(String(hcPartyId)) : "")
    let headers = this.headers
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new CalendarItem_1.CalendarItem(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Get calendarItems by id
   * @param body
   */
  getCalendarItemsWithIds(body) {
    let _body = null
    _body = body
    const _url = this.host + `/calendarItem/byIds` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new CalendarItem_1.CalendarItem(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Get CalendarItems by Period and AgendaId
   * @param startDate
   * @param endDate
   * @param agendaId
   */
  getCalendarsByPeriodAndAgendaId(startDate, endDate, agendaId) {
    let _body = null
    const _url =
      this.host +
      `/calendarItem/byPeriodAndAgendaId` +
      "?ts=" +
      new Date().getTime() +
      (startDate ? "&startDate=" + encodeURIComponent(String(startDate)) : "") +
      (endDate ? "&endDate=" + encodeURIComponent(String(endDate)) : "") +
      (agendaId ? "&agendaId=" + encodeURIComponent(String(agendaId)) : "")
    let headers = this.headers
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new CalendarItem_1.CalendarItem(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Modifies an calendarItem
   * @param body
   */
  modifyCalendarItem(body) {
    let _body = null
    _body = body
    const _url = this.host + `/calendarItem` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new CalendarItem_1.CalendarItem(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Update delegations in calendarItems
   * @param body
   */
  setCalendarItemsDelegations(body) {
    let _body = null
    _body = body
    const _url = this.host + `/calendarItem/delegations` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new CalendarItem_1.CalendarItem(it)))
      .catch(err => this.handleError(err))
  }
}
exports.IccCalendarItemApi = IccCalendarItemApi
//# sourceMappingURL=IccCalendarItemApi.js.map
