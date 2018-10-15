/**
 * 
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { XHR } from "./XHR"
import * as models from "../model/models"

export class iccTarificationApi {
  host: string
  headers: Array<XHR.Header>
  constructor(host: string, headers: any) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR.Header(k, headers[k]))
  }

  setHeaders(h: Array<XHR.Header>) {
    this.headers = h
  }

  handleError(e: XHR.Data) {
    if (e.status == 401) throw Error("auth-failed")
    else throw Error("api-error" + e.status)
  }

  createTarification(body?: models.TarificationDto): Promise<models.TarificationDto | any> {
    let _body = null
    _body = body
    
    const _url = this.host + "/tarification" + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc =>  new models.TarificationDto(doc.body as JSON))
      .catch(err => this.handleError(err))
}
  findPaginatedTarifications(region?: string, type?: string, tarification?: string, version?: string, startDocumentId?: string, limit?: number): Promise<models.TarificationPaginatedList | any> {
    let _body = null
    
    const _url = this.host + "/tarification" + "?ts=" + new Date().getTime()  + (region ? "&region=" + region : "") + (type ? "&type=" + type : "") + (tarification ? "&tarification=" + tarification : "") + (version ? "&version=" + version : "") + (startDocumentId ? "&startDocumentId=" + startDocumentId : "") + (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc =>  new models.TarificationPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
}
  findPaginatedTarificationsByLabel(region?: string, types?: string, language?: string, label?: string, startDocumentId?: string, limit?: number): Promise<models.TarificationPaginatedList | any> {
    let _body = null
    
    const _url = this.host + "/tarification/byLabel" + "?ts=" + new Date().getTime()  + (region ? "&region=" + region : "") + (types ? "&types=" + types : "") + (language ? "&language=" + language : "") + (label ? "&label=" + label : "") + (startDocumentId ? "&startDocumentId=" + startDocumentId : "") + (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc =>  new models.TarificationPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
}
  findTarifications(region?: string, type?: string, tarification?: string, version?: string): Promise<Array<models.TarificationDto> | any> {
    let _body = null
    
    const _url = this.host + "/tarification/byRegionTypeTarification" + "?ts=" + new Date().getTime()  + (region ? "&region=" + region : "") + (type ? "&type=" + type : "") + (tarification ? "&tarification=" + tarification : "") + (version ? "&version=" + version : "")
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.TarificationDto(it)))
      .catch(err => this.handleError(err))
}
  getTarification(tarificationId: string): Promise<models.TarificationDto | any> {
    let _body = null
    
    const _url = this.host + "/tarification/{tarificationId}".replace("{tarificationId}", tarificationId+"") + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc =>  new models.TarificationDto(doc.body as JSON))
      .catch(err => this.handleError(err))
}
  getTarificationWithParts(type: string, tarification: string, version: string): Promise<models.TarificationDto | any> {
    let _body = null
    
    const _url = this.host + "/tarification/{type}/{tarification}/{version}".replace("{type}", type+"").replace("{tarification}", tarification+"").replace("{version}", version+"") + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc =>  new models.TarificationDto(doc.body as JSON))
      .catch(err => this.handleError(err))
}
  getTarifications(body?: models.ListOfIdsDto): Promise<Array<models.TarificationDto> | any> {
    let _body = null
    _body = body
    
    const _url = this.host + "/tarification/byIds" + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.TarificationDto(it)))
      .catch(err => this.handleError(err))
}
  modifyTarification(body?: models.TarificationDto): Promise<models.TarificationDto | any> {
    let _body = null
    _body = body
    
    const _url = this.host + "/tarification" + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc =>  new models.TarificationDto(doc.body as JSON))
      .catch(err => this.handleError(err))
}
}

