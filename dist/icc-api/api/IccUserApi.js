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
const PaginatedListUser_1 = require("../model/PaginatedListUser")
const Unit_1 = require("../model/Unit")
const User_1 = require("../model/User")
const UserGroup_1 = require("../model/UserGroup")
class IccUserApi {
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
   * UserDto gets returned.
   * @summary Assign a healthcare party ID to current user
   * @param healthcarePartyId
   */
  assignHealthcareParty(healthcarePartyId) {
    let _body = null
    const _url =
      this.host +
      `/user/current/hcparty/${encodeURIComponent(String(healthcarePartyId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @param password
   */
  checkPassword(password) {
    let _body = null
    const _url = this.host + `/user/checkPassword` + "?ts=" + new Date().getTime()
    let headers = this.headers
    password && (headers = headers.concat(new XHR_1.XHR.Header("password", password)))
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }
  /**
   * Create a user. HealthcareParty ID should be set. Email has to be set and the Login has to be null. On server-side, Email will be used for Login.
   * @summary Create a user
   * @param body
   */
  createUser(body) {
    let _body = null
    _body = body
    const _url = this.host + `/user` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Create a user. HealthcareParty ID should be set. Email has to be set and the Login has to be null. On server-side, Email will be used for Login.
   * @summary Create a user
   * @param body
   * @param groupId
   */
  createUserInGroup(groupId, body) {
    let _body = null
    _body = body
    const _url =
      this.host +
      `/user/inGroup/${encodeURIComponent(String(groupId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Delete a User based on his/her ID. The return value is an array containing the ID of deleted user.
   * @summary Delete a User based on his/her ID.
   * @param userId
   */
  deleteUser(userId) {
    let _body = null
    const _url =
      this.host + `/user/${encodeURIComponent(String(userId))}` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => new DocIdentifier_1.DocIdentifier(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Delete a User based on his/her ID. The return value is an array containing the ID of deleted user.
   * @summary Delete a User based on his/her ID.
   * @param groupId
   * @param userId
   */
  deleteUserInGroup(groupId, userId) {
    let _body = null
    const _url =
      this.host +
      `/user/inGroup/${encodeURIComponent(String(groupId))}/${encodeURIComponent(String(userId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => new Unit_1.Unit(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @param password
   */
  encodePassword(password) {
    let _body = null
    const _url = this.host + `/user/encodePassword` + "?ts=" + new Date().getTime()
    let headers = this.headers
    password && (headers = headers.concat(new XHR_1.XHR.Header("password", password)))
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Get the list of users by healthcare party id
   * @param id
   */
  findByHcpartyId(id) {
    let _body = null
    const _url =
      this.host +
      `/user/byHealthcarePartyId/${encodeURIComponent(String(id))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
  /**
   *
   * @summary Send a forgotten email message to an user
   * @param body
   * @param email the email of the user
   */
  forgottenPassword(email, body) {
    let _body = null
    _body = body
    const _url =
      this.host +
      `/user/forgottenPassword/${encodeURIComponent(String(email))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }
  /**
   * Get current user.
   * @summary Get Currently logged-in user session.
   */
  getCurrentSession() {
    let _body = null
    const _url = this.host + `/user/session` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }
  /**
   * Get current user.
   * @summary Get presently logged-in user.
   */
  getCurrentUser() {
    let _body = null
    const _url = this.host + `/user/current` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Get current user.
   * @summary Get presently logged-in user.
   */
  getMatchingUsers() {
    let _body = null
    const _url = this.host + `/user/matches` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => doc.body.map(it => new UserGroup_1.UserGroup(it)))
      .catch(err => this.handleError(err))
  }
  /**
   * General information about the user
   * @summary Get a user by his ID
   * @param userId
   */
  getUser(userId) {
    let _body = null
    const _url =
      this.host + `/user/${encodeURIComponent(String(userId))}` + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * General information about the user
   * @summary Get a user by his Email/Login
   * @param email
   */
  getUserByEmail(email) {
    let _body = null
    const _url =
      this.host +
      `/user/byEmail/${encodeURIComponent(String(email))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Returns a list of users.
   * @summary List users with(out) pagination
   * @param startKey An user email
   * @param startDocumentId An user document ID
   * @param limit Number of rows
   */
  listUsers(startKey, startDocumentId, limit) {
    let _body = null
    const _url =
      this.host +
      `/user` +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + encodeURIComponent(String(startKey)) : "") +
      (startDocumentId ? "&startDocumentId=" + encodeURIComponent(String(startDocumentId)) : "") +
      (limit ? "&limit=" + encodeURIComponent(String(limit)) : "")
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new PaginatedListUser_1.PaginatedListUser(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Returns a list of users.
   * @summary List users with(out) pagination
   * @param groupId
   * @param startKey An user login
   * @param startDocumentId An user document ID
   * @param limit Number of rows
   */
  listUsersInGroup(groupId, startKey, startDocumentId, limit) {
    let _body = null
    const _url =
      this.host +
      `/user/inGroup/${encodeURIComponent(String(groupId))}` +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + encodeURIComponent(String(startKey)) : "") +
      (startDocumentId ? "&startDocumentId=" + encodeURIComponent(String(startDocumentId)) : "") +
      (limit ? "&limit=" + encodeURIComponent(String(limit)) : "")
    let headers = this.headers
    return XHR_1.XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new PaginatedListUser_1.PaginatedListUser(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * Modify a User properties based on his/her ID. The return value is the modified user.
   * @summary Modify a User property
   * @param body
   * @param userId
   */
  modifyProperties(userId, body) {
    let _body = null
    _body = body
    const _url =
      this.host +
      `/user/${encodeURIComponent(String(userId))}/properties` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * No particular return value. It's just a message.
   * @summary Modify a user.
   * @param body
   */
  modifyUser(body) {
    let _body = null
    _body = body
    const _url = this.host + `/user` + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
  /**
   * No particular return value. It's just a message.
   * @summary Modify a user.
   * @param body
   * @param groupId
   */
  modifyUserInGroup(groupId, body) {
    let _body = null
    _body = body
    const _url =
      this.host +
      `/user/inGroup/${encodeURIComponent(String(groupId))}` +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR_1.XHR.Header("Content-Type", "application/json"))
    return XHR_1.XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new User_1.User(doc.body))
      .catch(err => this.handleError(err))
  }
}
exports.IccUserApi = IccUserApi
//# sourceMappingURL=IccUserApi.js.map
