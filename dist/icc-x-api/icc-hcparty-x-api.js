"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const icc_api_1 = require("../icc-api")
// noinspection JSUnusedGlobalSymbols
class IccHcpartyXApi extends icc_api_1.IccHcpartyApi {
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
    this.hcPartyKeysCache = {}
    this.hcPartyCache = {}
    this.CACHE_RETENTION_IN_MS = 300000
  }
  getHcPartyFromCache(key) {
    const hcpInCache = this.hcPartyCache[key]
    const now = Date.now()
    if (hcpInCache && hcpInCache[0] > now) {
      return hcpInCache[1]
    }
    if (!hcpInCache) {
      console.log(`Cache miss for key ${key} because not in cache`)
    } else {
      console.log(`Cache miss for key ${key} because ${hcpInCache[0]} > ${now}`)
    }
    return null
  }
  putHcPartyInCache(key, value = null) {
    const hcp =
      value ||
      super.getHealthcareParty(key).catch(e => {
        console.log(`Evict key ${key} because of error`)
        delete this.hcPartyCache[key]
        throw e
      })
    this.hcPartyCache[key] = [Date.now() + this.CACHE_RETENTION_IN_MS, hcp]
    return hcp
  }
  modifyHealthcareParty(body) {
    if (body && body.id) {
      console.log(`Evict key ${body.id} because of modification`)
      delete this.hcPartyCache[body.id]
    }
    return super
      .modifyHealthcareParty(body)
      .then(hcp => this.putHcPartyInCache(hcp.id, Promise.resolve(hcp)))
  }
  getHealthcareParty(healthcarePartyId, bypassCache = false) {
    const fromCache = bypassCache ? undefined : this.getHcPartyFromCache(healthcarePartyId)
    return fromCache || this.putHcPartyInCache(healthcarePartyId)
  }
  getHealthcareParties(healthcarePartyIds) {
    const ids = healthcarePartyIds.split(",").filter(x => !!x)
    const cached = ids.map(id => [id, this.getHcPartyFromCache(id)])
    const toFetch = cached.filter(x => !x[1]).map(x => x[0])
    if (!toFetch.length) {
      return Promise.all(cached.map(x => x[1]))
    }
    const prom = super.getHealthcareParties(toFetch.join(","))
    return Promise.all(
      cached.map(
        x => x[1] || this.putHcPartyInCache(x[0], prom.then(hcps => hcps.find(h => h.id === x[0])))
      )
    )
  }
  getCurrentHealthcareParty() {
    return super
      .getCurrentHealthcareParty()
      .then(hcp => this.putHcPartyInCache(hcp.id, Promise.resolve(hcp)))
  }
  getHcPartyKeysForDelegate(healthcarePartyId, bypassCache = false) {
    const cached = bypassCache ? null : this.hcPartyKeysCache[healthcarePartyId]
    return cached
      ? Promise.resolve(cached)
      : super
          .getHcPartyKeysForDelegate(healthcarePartyId)
          .then(r => (this.hcPartyKeysCache[healthcarePartyId] = r))
  }
  isValidCbe(cbe) {
    cbe = cbe.replace(new RegExp("[^(0-9)]", "g"), "")
    cbe = cbe.length == 9 ? "0" + cbe : cbe
    return 97 - (Number(cbe.substr(0, 8)) % 97) === Number(cbe.substr(8, 2))
  }
}
exports.IccHcpartyXApi = IccHcpartyXApi
//# sourceMappingURL=icc-hcparty-x-api.js.map
