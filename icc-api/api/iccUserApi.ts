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
import { XHR } from "./XHR"
import { DocIdentifier } from "../model/DocIdentifier"
import { PropertyDto } from "../model/PropertyDto"
import { Unit } from "../model/Unit"
import { UserDto } from "../model/UserDto"
import { UserGroupDto } from "../model/UserGroupDto"
import { UserPaginatedList } from "../model/UserPaginatedList"

export class iccUserApi {
  host: string
  headers: Array<XHR.Header>
  fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>

  constructor(
    host: string,
    headers: any,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  ) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR.Header(k, headers[k]))
    this.fetchImpl = fetchImpl
  }

  setHeaders(h: Array<XHR.Header>) {
    this.headers = h
  }

  handleError(e: XHR.Data) {
    if (e.status == 401) throw Error("auth-failed")
    else throw Error("api-error" + e.status)
  }

  /**
   * UserDto gets returned.
   * @summary Assign a healthcare party ID to current user
   * @param healthcarePartyId
   */
  assignHealthcareParty(healthcarePartyId: string): Promise<UserDto | any> {
    let _body = null

    const _url =
      this.host +
      "/user/current/hcparty/${encodeURIComponent(String(healthcarePartyId))}".replace(
        "{healthcarePartyId}",
        healthcarePartyId + ""
      ) +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   *
   * @param password
   */
  checkPassword(password: string): Promise<boolean | any> {
    let _body = null

    const _url = this.host + "/user/checkPassword" + "?ts=" + new Date().getTime()
    let headers = this.headers
    password && (headers = headers.concat(new XHR.Header("password", password)))
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }

  /**
   * Create a user. HealthcareParty ID should be set. Email has to be set and the Login has to be null. On server-side, Email will be used for Login.
   * @summary Create a user
   * @param body
   */
  createUser(body?: UserDto): Promise<UserDto | any> {
    let _body = null
    _body = body

    const _url = this.host + "/user" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * Create a user. HealthcareParty ID should be set. Email has to be set and the Login has to be null. On server-side, Email will be used for Login.
   * @summary Create a user
   * @param body
   * @param groupId
   */
  createUserInGroup(groupId: string, body?: UserDto): Promise<UserDto | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/user/inGroup/${encodeURIComponent(String(groupId))}".replace("{groupId}", groupId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * Delete a User based on his/her ID. The return value is an array containing the ID of deleted user.
   * @summary Delete a User based on his/her ID.
   * @param userId
   */
  deleteUser(userId: string): Promise<DocIdentifier | any> {
    let _body = null

    const _url =
      this.host +
      "/user/${encodeURIComponent(String(userId))}".replace("{userId}", userId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => new DocIdentifier(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * Delete a User based on his/her ID. The return value is an array containing the ID of deleted user.
   * @summary Delete a User based on his/her ID.
   * @param groupId
   * @param userId
   */
  deleteUserInGroup(groupId: string, userId: string): Promise<Unit | any> {
    let _body = null

    const _url =
      this.host +
      "/user/inGroup/${encodeURIComponent(String(groupId))}/${encodeURIComponent(String(userId))}"
        .replace("{groupId}", groupId + "")
        .replace("{userId}", userId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => new Unit(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   *
   * @param password
   */
  encodePassword(password: string): Promise<string | any> {
    let _body = null

    const _url = this.host + "/user/encodePassword" + "?ts=" + new Date().getTime()
    let headers = this.headers
    password && (headers = headers.concat(new XHR.Header("password", password)))
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }

  /**
   *
   * @summary Get the list of users by healthcare party id
   * @param id
   */
  findByHcpartyId(id: string): Promise<Array<string> | any> {
    let _body = null

    const _url =
      this.host +
      "/user/byHealthcarePartyId/${encodeURIComponent(String(id))}".replace("{id}", id + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }

  /**
   * Get current user.
   * @summary Get Currently logged-in user session.
   */
  getCurrentSession(): Promise<string | any> {
    let _body = null

    const _url = this.host + "/user/session" + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }

  /**
   * Get current user.
   * @summary Get presently logged-in user.
   */
  getCurrentUser(): Promise<UserDto | any> {
    let _body = null

    const _url = this.host + "/user/current" + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * Get current user.
   * @summary Get presently logged-in user.
   */
  getMatchingUsers(): Promise<Array<UserGroupDto> | any> {
    let _body = null

    const _url = this.host + "/user/matches" + "?ts=" + new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => (doc.body as Array<JSON>).map(it => new UserGroupDto(it)))
      .catch(err => this.handleError(err))
  }

  /**
   * General information about the user
   * @summary Get a user by his ID
   * @param userId
   */
  getUser(userId: string): Promise<UserDto | any> {
    let _body = null

    const _url =
      this.host +
      "/user/${encodeURIComponent(String(userId))}".replace("{userId}", userId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * General information about the user
   * @summary Get a user by his Email/Login
   * @param email
   */
  getUserByEmail(email: string): Promise<UserDto | any> {
    let _body = null

    const _url =
      this.host +
      "/user/byEmail/${encodeURIComponent(String(email))}".replace("{email}", email + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * Returns a list of users.
   * @summary List users with(out) pagination
   * @param startKey An user email
   * @param startDocumentId An user document ID
   * @param limit Number of rows
   */
  listUsers(
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<UserPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/user" +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserPaginatedList(doc.body as JSON))
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
  listUsersInGroup(
    groupId: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<UserPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/user/inGroup/${encodeURIComponent(String(groupId))}".replace("{groupId}", groupId + "") +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * Modify a User properties based on his/her ID. The return value is the modified user.
   * @summary Modify a User property
   * @param body
   * @param userId
   */
  modifyProperties(userId: string, body?: Array<PropertyDto>): Promise<UserDto | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/user/${encodeURIComponent(String(userId))}/properties".replace("{userId}", userId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * No particular return value. It's just a message.
   * @summary Modify a user.
   * @param body
   */
  modifyUser(body?: UserDto): Promise<UserDto | any> {
    let _body = null
    _body = body

    const _url = this.host + "/user" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   * No particular return value. It's just a message.
   * @summary Modify a user.
   * @param body
   * @param groupId
   */
  modifyUserInGroup(groupId: string, body?: UserDto): Promise<UserDto | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/user/inGroup/${encodeURIComponent(String(groupId))}".replace("{groupId}", groupId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => new UserDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
}
