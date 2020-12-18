"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const icc_api_1 = require("../icc-api")
const _ = require("lodash")
class IccMessageXApi extends icc_api_1.IccMessageApi {
  constructor(
    host,
    headers,
    crypto,
    insuranceApi,
    entityReferenceApi,
    invoiceXApi,
    documentXApi,
    receiptXApi,
    patientApi,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    super(host, headers, fetchImpl)
    this.crypto = crypto
    this.insuranceApi = insuranceApi
    this.entityReferenceApi = entityReferenceApi
    this.receiptXApi = receiptXApi
    this.invoiceXApi = invoiceXApi
    this.documentXApi = documentXApi
    this.patientApi = patientApi
  }
  // noinspection JSUnusedGlobalSymbols
  newInstance(user, m) {
    return this.newInstanceWithPatient(user, null, m)
  }
  newInstanceWithPatient(user, patient, m) {
    const message = _.extend(
      {
        id: this.crypto.randomUuid(),
        _type: "org.taktik.icure.entities.Message",
        created: new Date().getTime(),
        modified: new Date().getTime(),
        responsible: user.healthcarePartyId,
        author: user.id,
        codes: [],
        tags: []
      },
      m || {}
    )
    const hcpId = user.healthcarePartyId || user.patientId
    return this.crypto
      .extractDelegationsSFKs(patient, hcpId)
      .then(secretForeignKeys =>
        this.crypto.initObjectDelegations(
          message,
          patient,
          hcpId,
          secretForeignKeys.extractedKeys[0]
        )
      )
      .then(initData => {
        _.extend(message, {
          delegations: initData.delegations,
          cryptedForeignKeys: initData.cryptedForeignKeys,
          secretForeignKeys: initData.secretForeignKeys
        })
        let promise = Promise.resolve(message)
        ;(user.autoDelegations
          ? (user.autoDelegations.all || []).concat(user.autoDelegations.medicalInformation || [])
          : []
        ).forEach(
          delegateId =>
            (promise = promise.then(helement =>
              this.crypto
                .extendedDelegationsAndCryptedForeignKeys(
                  helement,
                  patient,
                  hcpId,
                  delegateId,
                  initData.secretId
                )
                .then(extraData =>
                  _.extend(helement, {
                    delegations: extraData.delegations,
                    cryptedForeignKeys: extraData.cryptedForeignKeys
                  })
                )
                .catch(e => {
                  console.log(e)
                  return helement
                })
            ))
        )
        return promise
      })
  }
}
exports.IccMessageXApi = IccMessageXApi
//# sourceMappingURL=icc-message-x-api.js.map
