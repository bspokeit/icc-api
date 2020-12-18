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
const DocIdentifier_1 = require("../model/DocIdentifier")
const Keyword_1 = require("../model/Keyword")
class IccKeywordApi {
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
   * Returns an instance of created keyword.
   * @summary Create a keyword with the current user
   * @param body
   */
  createKeyword(body) {
    let _body = null
    _body = body
    const _url = this.host + `/keyword` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => new Keyword_1.Keyword(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Response is a set containing the ID's of deleted keywords.
   * @summary Delete keywords.
   * @param keywordIds
   */
  deleteKeywords(keywordIds) {
    let _body = null
    const _url =
      this.host +
      `/keyword/${encodeURIComponent(String(keywordIds))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new DocIdentifier_1.DocIdentifier(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Get a keyword
   * @param keywordId
   */
  getKeyword(keywordId) {
    let _body = null
    const _url =
      this.host +
      `/keyword/${encodeURIComponent(String(keywordId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new Keyword_1.Keyword(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Gets all keywords
   */
  getKeywords() {
    let _body = null
    const _url = this.host + `/keyword` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new Keyword_1.Keyword(it)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Get keywords by user
   * @param userId
   */
  getKeywordsByUser(userId) {
    let _body = null
    const _url =
      this.host +
      `/keyword/byUser/${encodeURIComponent(String(userId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new Keyword_1.Keyword(it)))
      .catch(err => this.handleError(err))
  }
  /**
   * Returns the modified keyword.
   * @summary Modify a keyword
   * @param body
   */
  modifyKeyword(body) {
    let _body = null
    _body = body
    const _url = this.host + `/keyword` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new Keyword_1.Keyword(doc.body))
      .catch(err => this.handleError(err))
  }
}
exports.IccKeywordApi = IccKeywordApi
//# sourceMappingURL=IccKeywordApi.js.map
