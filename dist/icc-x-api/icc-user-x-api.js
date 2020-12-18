"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const IccUserApi_1 = require("../icc-api/api/IccUserApi")
class IccUserXApi extends IccUserApi_1.IccUserApi {
  constructor(
    host,
    headers,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    super(host, headers, fetchImpl)
    this.fetchImpl = fetchImpl
  }
  static api(
    host,
    username,
    password,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    const headers = {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
    }
    return new IccUserXApi(host, headers, fetchImpl)
  }
}
exports.IccUserXApi = IccUserXApi
//# sourceMappingURL=icc-user-x-api.js.map
