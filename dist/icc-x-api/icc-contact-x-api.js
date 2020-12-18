"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, "__esModule", { value: true })
const icc_api_1 = require("../icc-api")
const contact_i18n_1 = require("./rsrc/contact.i18n")
const utils_1 = require("./crypto/utils")
const moment = require("moment")
const _ = require("lodash")
const models = require("../icc-api/model/models")
class IccContactXApi extends icc_api_1.IccContactApi {
  constructor(
    host,
    headers,
    crypto,
    fetchImpl = typeof window !== "undefined"
      ? window.fetch
      : typeof self !== "undefined"
        ? self.fetch
        : fetch
  ) {
    super(host, headers, fetchImpl)
    this.i18n = contact_i18n_1.default
    this.crypto = crypto
  }
  newInstance(user, patient, c, confidential = false) {
    const contact = new models.Contact(
      _.extend(
        {
          id: this.crypto.randomUuid(),
          _type: "org.taktik.icure.entities.Contact",
          created: new Date().getTime(),
          modified: new Date().getTime(),
          responsible: user.healthcarePartyId || user.patientId,
          author: user.id,
          codes: [],
          tags: [],
          groupId: this.crypto.randomUuid(),
          subContacts: [],
          services: [],
          openingDate: parseInt(moment().format("YYYYMMDDHHmmss"))
        },
        c || {}
      )
    )
    return this.initDelegationsAndEncryptionKeys(user, patient, contact, confidential)
  }
  /**
   * 1. Extract(decrypt) the patient's secretForeignKeys from the
   * "delegations" object.
   * 2. Initialize & encrypt the Contact's delegations & cryptedForeignKeys.
   * 3. Initialize & encrypt the Contact's encryptionKeys.
   * 4. Return the contact with the extended delegations, cryptedForeignKeys
   * & encryptionKeys.
   */
  initDelegationsAndEncryptionKeys(user, patient, contact, confidential = false) {
    const hcpId = user.healthcarePartyId || user.patientId
    return this.crypto
      .extractPreferredSfk(patient, hcpId, confidential)
      .then(key => {
        if (!key) {
          console.error(
            `SFK cannot be found for HealthElement ${key}. The health element will not be reachable from the patient side`
          )
        }
        return Promise.all([
          this.crypto.initObjectDelegations(contact, patient, hcpId, key),
          this.crypto.initEncryptionKeys(contact, hcpId)
        ])
      })
      .then(([dels, eks]) => {
        _.extend(contact, {
          delegations: dels.delegations,
          cryptedForeignKeys: dels.cryptedForeignKeys,
          secretForeignKeys: dels.secretForeignKeys,
          encryptionKeys: eks.encryptionKeys
        })
        let promise = Promise.resolve(contact)
        ;(user.autoDelegations
          ? (user.autoDelegations.all || []).concat(user.autoDelegations.medicalInformation || [])
          : []
        ).forEach(
          delegateId =>
            (promise = promise.then(contact =>
              this.crypto
                .addDelegationsAndEncryptionKeys(
                  patient,
                  contact,
                  hcpId,
                  delegateId,
                  dels.secretId,
                  eks.secretId
                )
                .catch(e => {
                  console.log(e)
                  return contact
                })
            ))
        )
        return promise
      })
  }
  initEncryptionKeys(user, ctc) {
    const hcpId = user.healthcarePartyId || user.patientId
    return this.crypto.initEncryptionKeys(ctc, hcpId).then(eks => {
      let promise = Promise.resolve(
        _.extend(ctc, {
          encryptionKeys: eks.encryptionKeys
        })
      )
      ;(user.autoDelegations
        ? (user.autoDelegations.all || []).concat(user.autoDelegations.medicalInformation || [])
        : []
      ).forEach(
        delegateId =>
          (promise = promise.then(contact =>
            this.crypto
              .appendEncryptionKeys(contact, hcpId, delegateId, eks.secretId)
              .then(extraEks => {
                return _.extend(contact, {
                  encryptionKeys: extraEks.encryptionKeys
                })
              })
              .catch(e => {
                console.log(e.message)
                return contact
              })
          ))
      )
      return promise
    })
  }
  /**
   * 1. Check whether there is a delegation with 'hcpartyId' or not.
   * 2. 'fetchHcParty[hcpartyId][1]': is encrypted AES exchange key by RSA public key of him.
   * 3. Obtain the AES exchange key, by decrypting the previous step value with hcparty private key
   *      3.1.  KeyPair should be fetch from cache (in jwk)
   *      3.2.  if it doesn't exist in the cache, it has to be loaded from Browser Local store, and then import it to WebCrypto
   * 4. Obtain the array of delegations which are delegated to his ID (hcpartyId) in this patient
   * 5. Decrypt and collect all keys (secretForeignKeys) within delegations of previous step (with obtained AES key of step 4)
   * 6. Do the REST call to get all contacts with (allSecretForeignKeysDelimitedByComa, hcpartyId)
   *
   * After these painful steps, you have the contacts of the patient.
   *
   * @param hcpartyId
   * @param patient (Promise)
   */
  findBy(hcpartyId, patient) {
    return this.crypto.extractSFKsHierarchyFromDelegations(patient, hcpartyId).then(
      secretForeignKeys =>
        secretForeignKeys && secretForeignKeys.length > 0
          ? Promise.all(
              secretForeignKeys
                .reduce((acc, level) => {
                  return acc.concat([
                    {
                      hcpartyId: level.hcpartyId,
                      extractedKeys: level.extractedKeys.filter(
                        key => !acc.some(previousLevel => previousLevel.extractedKeys.includes(key))
                      )
                    }
                  ])
                }, [])
                .filter(l => l.extractedKeys.length > 0)
                .map(({ hcpartyId, extractedKeys }) =>
                  this.findByHCPartyPatientSecretFKeys(hcpartyId, extractedKeys.join(","))
                )
            ).then(results => _.uniqBy(_.flatMap(results), x => x.id))
          : Promise.resolve([])
    )
  }
  findByPatientSFKs(hcpartyId, patients) {
    return __awaiter(this, void 0, void 0, function*() {
      const perHcpId = {}
      for (const patient of patients) {
        ;(yield this.crypto.extractSFKsHierarchyFromDelegations(patient, hcpartyId))
          .reduce((acc, level) => {
            return acc.concat([
              {
                hcpartyId: level.hcpartyId,
                extractedKeys: level.extractedKeys.filter(
                  key => !acc.some(previousLevel => previousLevel.extractedKeys.includes(key))
                )
              }
            ])
          }, [])
          .filter(l => l.extractedKeys.length > 0)
          .forEach(({ hcpartyId, extractedKeys }) => {
            ;(perHcpId[hcpartyId] || (perHcpId[hcpartyId] = [])).push(...extractedKeys)
          })
      }
      return _.uniqBy(
        _.flatMap(
          yield Promise.all(
            Object.keys(perHcpId).map(hcpId =>
              this.findContactsByHCPartyPatientForeignKeys(
                hcpartyId,
                new models.ListOfIds({
                  ids: perHcpId[hcpId]
                })
              )
            )
          )
        ),
        x => x.id
      )
    })
  }
  filterBy(startKey, startDocumentId, limit, body) {
    throw new Error(
      "Cannot call a method that returns contacts without providing a user for de/encryption"
    )
  }
  listContactsByOpeningDate(startKey, endKey, hcpartyid, startDocumentId, limit) {
    throw new Error(
      "Cannot call a method that returns contacts without providing a user for de/encryption"
    )
  }
  findByHCPartyFormId(hcPartyId, formId) {
    throw new Error(
      "Cannot call a method that returns contacts without providing a user for de/encryption"
    )
  }
  findByHCPartyFormIds(hcPartyId, body) {
    throw new Error(
      "Cannot call a method that returns contacts without providing a user for de/encryption"
    )
  }
  getContact(contactId) {
    throw new Error(
      "Cannot call a method that returns contacts without providing a user for de/encryption"
    )
  }
  getContacts(body) {
    throw new Error(
      "Cannot call a method that returns contacts without providing a user for de/encryption"
    )
  }
  modifyContact(body) {
    throw new Error(
      "Cannot call a method that modify contacts without providing a user for de/encryption"
    )
  }
  modifyContacts(body) {
    throw new Error(
      "Cannot call a method that modify contacts without providing a user for de/encryption"
    )
  }
  createContact(body) {
    throw new Error(
      "Cannot call a method that modify contacts without providing a user for de/encryption"
    )
  }
  findByHCPartyPatientSecretFKeys(hcPartyId, secretFKeys, planOfActionIds, skipClosedContacts) {
    return super
      .findByHCPartyPatientSecretFKeys(hcPartyId, secretFKeys, planOfActionIds, skipClosedContacts)
      .then(contacts => this.decrypt(hcPartyId, contacts))
  }
  filterByWithUser(user, startDocumentId, limit, body) {
    return super
      .filterContactsBy(startDocumentId, limit, body)
      .then(ctcs =>
        this.decrypt(user.healthcarePartyId, ctcs.rows).then(decryptedRows =>
          Object.assign(ctcs, { rows: decryptedRows })
        )
      )
  }
  listContactsByOpeningDateWithUser(user, startKey, endKey, hcpartyid, startDocumentId, limit) {
    return super
      .listContactsByOpeningDate(startKey, endKey, hcpartyid, startDocumentId, limit)
      .then(ctcs => {
        ctcs.rows = this.decrypt(user.healthcarePartyId || user.patientId, ctcs.rows)
        return ctcs
      })
  }
  findByHCPartyFormIdWithUser(user, hcPartyId, formId) {
    return super
      .findByHCPartyFormId(hcPartyId, formId)
      .then(ctcs => this.decrypt(user.healthcarePartyId || user.patientId, ctcs))
  }
  findByHCPartyFormIdsWithUser(user, hcPartyId, body) {
    return super
      .findByHCPartyFormIds(hcPartyId, body)
      .then(ctcs => this.decrypt(user.healthcarePartyId || user.patientId, ctcs))
  }
  getContactWithUser(user, contactId) {
    return super
      .getContact(contactId)
      .then(ctc => this.decrypt(user.healthcarePartyId || user.patientId, [ctc]))
      .then(ctcs => ctcs[0])
  }
  getContactsWithUser(user, body) {
    return super
      .getContacts(body)
      .then(ctcs => this.decrypt(user.healthcarePartyId || user.patientId, ctcs))
  }
  modifyContactWithUser(user, body) {
    return body
      ? this.encrypt(user, [_.cloneDeep(body)])
          .then(ctcs => super.modifyContact(ctcs[0]))
          .then(ctc => this.decrypt(user.healthcarePartyId || user.patientId, [ctc]))
          .then(ctcs => ctcs[0])
      : Promise.resolve(null)
  }
  modifyContactsWithUser(user, bodies) {
    return bodies
      ? this.encrypt(user, bodies.map(c => _.cloneDeep(c)))
          .then(ctcs => super.modifyContacts(ctcs))
          .then(ctcs => this.decrypt(user.healthcarePartyId || user.patientId, ctcs))
      : Promise.resolve(null)
  }
  createContactWithUser(user, body) {
    return body
      ? this.encrypt(user, [_.cloneDeep(body)])
          .then(ctcs => super.createContact(ctcs[0]))
          .then(ctc => this.decrypt(user.healthcarePartyId || user.patientId, [ctc]))
          .then(ctcs => ctcs[0])
      : Promise.resolve(null)
  }
  encryptServices(key, rawKey, services) {
    return Promise.all(
      services.map(svc =>
        __awaiter(this, void 0, void 0, function*() {
          if (!svc.content) {
            return svc
          }
          if (
            Object.values(svc.content).every(
              c =>
                c.compoundValue &&
                !c.stringValue &&
                !c.documentId &&
                !c.measureValue &&
                !c.medicationValue &&
                (c.booleanValue === null || c.booleanValue === undefined) &&
                (c.numberValue === null || c.numberValue === undefined) &&
                !c.instantValue &&
                !c.fuzzyDateValue &&
                !c.binaryValue
            )
          ) {
            svc.content = _.fromPairs(
              yield Promise.all(
                _.toPairs(svc.content).map(p =>
                  __awaiter(this, void 0, void 0, function*() {
                    p[1].compoundValue = yield this.encryptServices(key, rawKey, p[1].compoundValue)
                    return p
                  })
                )
              )
            )
          } else {
            svc.encryptedSelf = btoa(
              utils_1.utils.ua2text(
                yield this.crypto.AES.encrypt(
                  key,
                  utils_1.utils.utf82ua(JSON.stringify({ content: svc.content })),
                  rawKey
                )
              )
            )
            delete svc.content
          }
          return svc
        })
      )
    )
  }
  encrypt(user, ctcs) {
    const hcpartyId = user.healthcarePartyId || user.patientId
    const bypassEncryption = false //Used for debug
    return Promise.all(
      ctcs.map(ctc =>
        __awaiter(this, void 0, void 0, function*() {
          const initialisedCtc = bypassEncryption //Prevent encryption for test ctc
            ? ctc
            : yield ctc.encryptionKeys && Object.keys(ctc.encryptionKeys || {}).length
                ? Promise.resolve(ctc)
                : this.initEncryptionKeys(user, ctc)
          const sfks = yield this.crypto.extractKeysFromDelegationsForHcpHierarchy(
            hcpartyId,
            initialisedCtc.id,
            initialisedCtc.encryptionKeys
          )
          const rawKey = sfks.extractedKeys[0].replace(/-/g, "")
          const key = yield this.crypto.AES.importKey("raw", utils_1.utils.hex2ua(rawKey))
          initialisedCtc.services = yield this.encryptServices(key, rawKey, ctc.services || [])
          initialisedCtc.encryptedSelf = btoa(
            utils_1.utils.ua2text(
              yield this.crypto.AES.encrypt(
                key,
                utils_1.utils.utf82ua(JSON.stringify({ descr: ctc.descr })),
                rawKey
              )
            )
          )
          delete initialisedCtc.descr
          return initialisedCtc
        })
      )
    )
  }
  decrypt(hcpartyId, ctcs) {
    return Promise.all(
      ctcs.map(ctc =>
        __awaiter(this, void 0, void 0, function*() {
          const {
            extractedKeys: sfks
          } = yield this.crypto.extractKeysFromDelegationsForHcpHierarchy(
            hcpartyId,
            ctc.id,
            _.size(ctc.encryptionKeys) ? ctc.encryptionKeys : ctc.delegations
          )
          if (!sfks || !sfks.length) {
            console.log("Cannot decrypt contact", ctc.id)
            return ctc
          }
          const rawKey = sfks[0].replace(/-/g, "")
          const key = yield this.crypto.AES.importKey("raw", utils_1.utils.hex2ua(rawKey))
          ctc.services = yield this.decryptServices(hcpartyId, ctc.services || [], key, rawKey)
          if (ctc.encryptedSelf) {
            try {
              const dec = yield this.crypto.AES.decrypt(
                key,
                utils_1.utils.text2ua(atob(ctc.encryptedSelf)),
                rawKey
              )
              let jsonContent
              try {
                jsonContent = dec && utils_1.utils.ua2utf8(dec)
                jsonContent && _.assign(ctc, JSON.parse(jsonContent))
              } catch (e) {
                console.log("Cannot parse ctc", ctc.id, jsonContent || "<- Invalid encoding")
              }
            } catch (_a) {
              console.log("Cannot decrypt contact", ctc.id)
            }
          }
          return ctc
        })
      )
    )
  }
  decryptServices(hcpartyId, svcs, key, rawKey) {
    return Promise.all(
      svcs.map(svc =>
        __awaiter(this, void 0, void 0, function*() {
          if (!key) {
            const {
              extractedKeys: sfks
            } = yield this.crypto.extractKeysFromDelegationsForHcpHierarchy(
              hcpartyId,
              svc.id,
              _.size(svc.encryptionKeys) ? svc.encryptionKeys : svc.delegations
            )
            key = yield this.crypto.AES.importKey(
              "raw",
              utils_1.utils.hex2ua(sfks[0].replace(/-/g, ""))
            )
          }
          if (svc.encryptedContent) {
            try {
              const dec = yield this.crypto.AES.decrypt(
                key,
                utils_1.utils.text2ua(atob(svc.encryptedContent))
              )
              let jsonContent
              try {
                jsonContent = utils_1.utils.ua2utf8(
                  utils_1.utils.truncateTrailingNulls(new Uint8Array(dec))
                )
                Object.assign(svc, { content: JSON.parse(jsonContent) })
              } catch (e) {
                console.log("Cannot parse service", svc.id, jsonContent || "<- Invalid encoding")
              }
            } catch (_a) {
              console.log("Cannot decrypt service", svc.id)
            }
          } else if (svc.encryptedSelf) {
            try {
              const dec = yield this.crypto.AES.decrypt(
                key,
                utils_1.utils.text2ua(atob(svc.encryptedSelf))
              )
              let jsonContent
              try {
                jsonContent = utils_1.utils.ua2utf8(
                  utils_1.utils.truncateTrailingNulls(new Uint8Array(dec))
                )
                Object.assign(svc, JSON.parse(jsonContent))
              } catch (e) {
                console.log("Cannot parse service", svc.id, jsonContent || "<- Invalid encoding")
              }
            } catch (_b) {
              console.log("Cannot decrypt service", svc.id)
            }
          } else {
            svc.content = _.fromPairs(
              yield Promise.all(
                _.toPairs(svc.content).map(p =>
                  __awaiter(this, void 0, void 0, function*() {
                    if (p[1].compoundValue) {
                      p[1].compoundValue = yield this.decryptServices(
                        hcpartyId,
                        p[1].compoundValue,
                        key,
                        rawKey
                      )
                    }
                    return p
                  })
                )
              )
            )
          }
          return svc
        })
      )
    )
  }
  contactOfService(ctcs, svcId) {
    let latestContact = undefined
    let latestService
    ctcs.forEach(c => {
      const s = c.services.find(it => svcId === it.id)
      if (s && (!latestService || moment(s.valueDate).isAfter(moment(latestService.valueDate)))) {
        latestContact = c
        latestService = s
      }
    })
    return latestContact
  }
  filteredServices(ctcs, filter) {
    const byIds = {}
    ctcs.forEach(c =>
      (c.services || []).filter(s => filter(s, c)).forEach(s => {
        const ps = byIds[s.id]
        if (!ps || !ps.modified || (s.modified && ps.modified < s.modified)) {
          byIds[s.id] = s
          s.contactId = c.id
        }
      })
    )
    return _.values(byIds).filter(s => !s.deleted && !s.endOfLife)
  }
  //Return a promise
  filterServices(ctcs, filter) {
    return Promise.resolve(this.filteredServices(ctcs, filter))
  }
  services(ctc, label) {
    return ctc.services.filter(s => s.label === label)
  }
  preferredContent(svc, lng) {
    return (
      svc &&
      svc.content &&
      (svc.content[lng] ||
        svc.content["fr"] ||
        (Object.keys(svc.content)[0] ? svc.content[Object.keys(svc.content)[0]] : null))
    )
  }
  contentValue(c) {
    return (
      c.stringValue ||
      ((c.numberValue || c.numberValue === 0) && c.numberValue) ||
      (c.measureValue && (c.measureValue.value || c.measureValue.value === 0)
        ? c.measureValue
        : null) ||
      c.medicationValue ||
      c.booleanValue
    )
  }
  shortServiceDescription(svc, lng) {
    const c = this.preferredContent(svc, lng)
    return !c ? "" : this.shortContentDescription(c, lng, svc.label)
  }
  shortContentDescription(c, lng, label) {
    return (
      c.stringValue ||
      ((c.numberValue || c.numberValue === 0) && c.numberValue) ||
      (c.measureValue &&
        "" +
          (c.measureValue.value || c.measureValue.value === 0 ? c.measureValue.value : "-") +
          (c.measureValue.unit ? " " + c.measureValue.unit : "")) ||
      (c.medicationValue ? this.medication().medicationToString(c.medicationValue, lng) : null) ||
      ((c.booleanValue && label) || "OK")
    )
  }
  medicationValue(svc, lng) {
    const c =
      svc &&
      svc.content &&
      (svc.content[lng] ||
        svc.content["fr"] ||
        (Object.keys(svc.content)[0] ? svc.content[Object.keys(svc.content)[0]] : null))
    return c && c.medicationValue
  }
  contentHasData(c) {
    return (
      c.stringValue ||
      c.numberValue ||
      c.measureValue ||
      c.booleanValue ||
      c.booleanValue === false ||
      c.medicationValue ||
      c.documentId
    )
  }
  localize(e, lng) {
    if (!e) {
      return null
    }
    return e[lng] || e.fr || e.en || e.nl
  }
  /**
   * Modifies the subcontacts this svc belongs to while minimizing the number of references to the svcs inside the subcontacts
   * After the invocation, there is at least one subcontact with provided poaId and heId that contains the svc
   * The svc is not removed from a previous subcontact it would belong to except if the new conditions are compatible
   * Note that undefined and null do not have the same meaning for formId
   * If formId is null: the subcontact which refers svc must have a null formId
   * If formId is undefined, the subcontact can have any value for formId
   *
   * When a svc does not exist yet in the current contact but exists in a previous contact, all the scs it was belonging to are
   * copied in the current contact
   *
   * the svc returned is the one that's inside the ctc
   *
   * @param ctc
   * @param user
   * @param ctcs
   * @param svc
   * @param formId
   * @param poaId aMap {heId2: [poaId11, poaId12], heId2: [poaId21] }
   * @param heId an Array of heIds, equivalent to poaIds = {heId: [], ...}
   * @param init
   * @returns {*}
   */
  promoteServiceInContact(ctc, user, ctcs, svc, formId, poaIds, heIds, init) {
    if (!ctc) {
      return null
    }
    const existing = ctc.services.find(s => s.id === svc.id)
    const promoted = _.extend(_.extend(existing || {}, svc), {
      author: user.id,
      responsible: user.healthcarePartyId || user.patientId,
      modified: new Date().getTime()
    })
    if (!existing) {
      ;(ctc.services || (ctc.services = [])).push(promoted)
    }
    const allSubcontactsInCurrentContactContainingService = (ctc.subContacts || []).filter(csc =>
      (csc.services || []).some(s => s.serviceId === svc.id)
    )
    //Rearrange poaIds and heIds as a hierarchy
    const hierarchyOfHeAndPoaIds = {}
    ;(heIds || []).forEach(id => (hierarchyOfHeAndPoaIds[id || "_"] = []))
    Object.keys(poaIds || {}).forEach(k => {
      const poas = hierarchyOfHeAndPoaIds[k]
      if (poas) {
        hierarchyOfHeAndPoaIds[k] = _.concat(poas, (poaIds || {})[k])
      } else {
        hierarchyOfHeAndPoaIds[k] = (poaIds || {})[k]
      }
    })
    const pastCtc =
      (svc.contactId && svc.contactId !== ctc.id && ctcs.find(c => c.id === svc.contactId)) ||
      ctcs.reduce(
        (selected, c) => {
          const candidate = (c.services || []).find(s => s.id === svc.id)
          return ctc.id !== c.id &&
            candidate &&
            (selected.s === null ||
              utils_1.utils.before(selected.s.modified || 0, candidate.modified || 0))
            ? { s: candidate, c: c }
            : selected
        },
        { s: null, c: null }
      ).c
    //Make sure that all scs the svc was belonging to are copied inside the current contact
    pastCtc &&
      pastCtc.subContacts
        .filter(psc => psc.services.some(s => s.serviceId === svc.id))
        .forEach(psc => {
          const sameInCurrent = allSubcontactsInCurrentContactContainingService.find(
            csc =>
              csc.formId === psc.formId &&
              csc.planOfActionId === psc.planOfActionId &&
              csc.healthElementId === psc.healthElementId
          )
          if (sameInCurrent) {
            if (!sameInCurrent.services.some(s => s.serviceId === svc.id)) {
              sameInCurrent.services.push({ serviceId: svc.id })
            }
          } else {
            const newSubContact = _.assign(_.assign({}, psc), {
              services: [{ serviceId: svc.id }]
            })
            ctc.subContacts.push(newSubContact)
            allSubcontactsInCurrentContactContainingService.push(newSubContact)
          }
        })
    if (!Object.keys(hierarchyOfHeAndPoaIds).length) {
      hierarchyOfHeAndPoaIds._ = [] //Default is to have at least one option with heId equals to null (represented by _)
    }
    Object.keys(hierarchyOfHeAndPoaIds).forEach(heId => {
      if (heId === "_") {
        heId = null
      }
      const subPoaIds = heId ? hierarchyOfHeAndPoaIds[heId] : []
      ;((subPoaIds || []).length ? subPoaIds : [null]).forEach(poaId => {
        //Create or assign subcontacts for all pairs he/poa (can be null/null)
        let destinationSubcontact = ctc.subContacts.find(
          sc =>
            (!formId || sc.formId === formId) &&
            ((!poaId && !sc.planOfActionId) || sc.planOfActionId === poaId) &&
            ((!heId && !sc.healthElementId) || sc.healthElementId === heId)
        )
        if (!destinationSubcontact) {
          ctc.subContacts.push(
            (destinationSubcontact = new models.SubContact({
              formId: formId || undefined,
              planOfActionId: poaId,
              healthElementId: heId,
              services: []
            }))
          )
        }
        const redundantSubcontact =
          allSubcontactsInCurrentContactContainingService.find(
            aSc => destinationSubcontact === aSc
          ) ||
          allSubcontactsInCurrentContactContainingService.find(
            aSc =>
              (!aSc.planOfActionId ||
                aSc.planOfActionId === destinationSubcontact.planOfActionId) &&
              (!aSc.healthElementId ||
                aSc.healthElementId === destinationSubcontact.healthElementId) &&
              (!aSc.formId || aSc.formId === destinationSubcontact.formId)
          ) // Find a compatible sc: one that does not contain extra and ≠ information than the destination
        if (redundantSubcontact && redundantSubcontact !== destinationSubcontact) {
          redundantSubcontact.services.splice(
            redundantSubcontact.services.findIndex(link => link.serviceId === svc.id),
            1
          )
        }
        if (!destinationSubcontact.services.some(s => s.serviceId === svc.id)) {
          destinationSubcontact.services.push({ serviceId: svc.id })
        }
      })
    })
    return (init && init(promoted)) || promoted
  }
  isNumeric(svc, lng) {
    const c = this.preferredContent(svc, lng)
    return c && (c.measureValue || c.numberValue || c.numberValue == 0)
  }
  service() {
    return {
      newInstance: (user, s) =>
        _.extend(
          {
            id: this.crypto.randomUuid(),
            _type: "org.taktik.icure.entities.embed.Service",
            created: new Date().getTime(),
            modified: new Date().getTime(),
            responsible: user.healthcarePartyId || user.patientId,
            author: user.id,
            codes: [],
            tags: [],
            content: {},
            valueDate: parseInt(moment().format("YYYYMMDDHHmmss"))
          },
          s
        )
    }
  }
  medication() {
    const regimenScores = {
      afterwakingup: 63000,
      beforebreakfast: 70000,
      duringbreakfast: 80000,
      afterbreakfast: 90000,
      morning: 100000,
      betweenbreakfastandlunch: 103000,
      beforelunch: 113000,
      midday: 120000,
      duringlunch: 123000,
      afterlunch: 130000,
      afternoon: 140000,
      betweenlunchanddinner: 160000,
      beforedinner: 180000,
      duringdinner: 190000,
      afterdinner: 200000,
      evening: 210000,
      betweendinnerandsleep: 213000,
      thehourofsleep: 220000,
      night: 230000,
      beforemeals: -30000,
      betweenmeals: -20000,
      aftermeals: -10000
    }
    const myself = {
      regimenScores: function() {
        return regimenScores
      },
      medicationNameToString: function(m) {
        return m && m.compoundPrescription
          ? m.compoundPrescription
          : m && m.substanceProduct
            ? myself.productToString(m && m.substanceProduct)
            : myself.productToString(m && m.medicinalProduct)
      },
      reimbursementReasonToString: (m, lang) => {
        return m &&
          m.reimbursementReason &&
          m.reimbursementReason.label &&
          m.reimbursementReason.label.hasOwnProperty(lang)
          ? m.reimbursementReason.label[lang]
          : ""
      },
      medicationToString: (m, lang) => {
        let res = `${myself.medicationNameToString(m)}, ${myself.posologyToString(m, lang)}`
        let reason = myself.reimbursementReasonToString(m, lang)
        res = m.numberOfPackages
          ? `${m.numberOfPackages} ${
              m.numberOfPackages > 1 ? this.i18n[lang].packagesOf : this.i18n[lang].packageOf
            } ${res}`
          : res
        res = m.duration
          ? `${res} ${this.i18n[lang].during} ${myself.durationToString(m.duration, lang)}`
          : res
        res = reason ? `${res} (${reason})` : res
        return res
      },
      productToString: m => {
        if (!m) {
          return ""
        }
        return m.intendedname
      },
      posologyToString: (m, lang) => {
        if (m) {
          if (m.instructionForPatient && m.instructionForPatient.length) {
            return m.instructionForPatient
          }
          if (!m.regimen || !m.regimen.length) {
            return ""
          }
          let unit =
            m.regimen[0].administratedQuantity &&
            m.regimen[0].administratedQuantity.administrationUnit
              ? m.regimen[0].administratedQuantity.administrationUnit.code
              : m.regimen[0].administratedQuantity && m.regimen[0].administratedQuantity.unit
          let quantity =
            m.regimen[0].administratedQuantity && m.regimen[0].administratedQuantity.quantity
          m.regimen.slice(1).find(ri => {
            let oUnit =
              ri.administratedQuantity && ri.administratedQuantity.administrationUnit
                ? ri.administratedQuantity.administrationUnit.code
                : ri.administratedQuantity && ri.administratedQuantity.unit
            let oQuantity = ri.administratedQuantity && ri.administratedQuantity.quantity
            if (oQuantity !== quantity) {
              quantity = -1
            }
            return oUnit !== unit && oQuantity !== quantity
          })
          const cplxRegimen = !unit || quantity < 0
          const quantityUnit = cplxRegimen
            ? `1 ${this.i18n[lang].take_s_}`
            : `${quantity} ${unit || this.i18n[lang].take_s_}`
          const dayPeriod = m.regimen.find(r => r.weekday !== null && r.weekday !== undefined)
            ? this.i18n[lang].weekly
            : m.regimen.find(r => r.date)
              ? this.i18n[lang].monthly
              : this.i18n[lang].daily
          return `${quantityUnit}, ${m.regimen.length} x ${dayPeriod}, ${_.sortBy(
            m.regimen,
            r =>
              (r.date ? r.date * 1000000 : 29990000000000) +
              (r.dayNumber || 0) * 1000000 +
              ((r.weekday && r.weekday.weekNumber) || 0) * 7 * 1000000 +
              (r.timeOfDay
                ? r.timeOfDay
                : r.dayPeriod && r.dayPeriod.code
                  ? regimenScores[r.dayPeriod.code]
                  : 0)
          )
            .map(
              r =>
                cplxRegimen ? myself.regimenToExtString(r, lang) : myself.regimenToString(r, lang)
            )
            .join(", ")}`
        }
      },
      frequencyToString: (m, lang) => {
        if (m.instructionForPatient && m.instructionForPatient.length) {
          return m.instructionForPatient
        }
        if (!m.regimen || !m.regimen.length) {
          return ""
        }
        const dayPeriod = m.regimen.find(r => r.weekday !== null && r.weekday !== undefined)
          ? this.i18n[lang].weekly
          : m.regimen.find(r => r.date)
            ? this.i18n[lang].monthly
            : this.i18n[lang].daily
        return `${m.regimen.length} x ${dayPeriod}`
      },
      durationToString: (d, lang) => {
        return d.value ? `${d.value} ${this.localize(d.unit.label, lang)}` : ""
      },
      regimenToExtString: (r, lang) => {
        const desc = myself.regimenToString(r, lang)
        return (
          (r.administratedQuantity && r.administratedQuantity.quantity && desc
            ? `${desc} (${r.administratedQuantity.quantity} ${(r.administratedQuantity
                .administrationUnit
                ? r.administratedQuantity.administrationUnit.code
                : r.administratedQuantity.unit) || this.i18n[lang].take_s_})`
            : desc) || ""
        )
      },
      regimenToString: (r, lang) => {
        let res = r.date
          ? `${this.i18n[lang].the} ${moment(r.date).format("DD/MM/YYYY")}`
          : r.dayNumber
            ? `${this.i18n[lang].onDay} ${r.dayNumber}`
            : r.weekday && r.weekday.weekday
              ? `${this.i18n[lang].on} ${r.weekday.weekday}`
              : null
        if (r.dayPeriod && r.dayPeriod.code && r.dayPeriod.code.length) {
          res = res
            ? `${res} ${this.i18n[lang][r.dayPeriod.code] ||
                this.localize(r.dayPeriod.label, lang) ||
                r.dayPeriod.code}`
            : this.i18n[lang][r.dayPeriod.code] ||
              this.localize(r.dayPeriod.label, lang) ||
              r.dayPeriod.code
        }
        if (r.timeOfDay) {
          const timeOfDay =
            r.timeOfDay === 120000
              ? this.i18n[lang].noon
              : `${Math.floor(r.timeOfDay / 10000)}:${(
                  "" +
                  (Math.floor(r.timeOfDay / 100) % 100)
                ).replace(/^(.)$/, "0$1")}`
          res = res ? res + " " + this.i18n[lang].at + " " + timeOfDay : timeOfDay
        }
        return res
      },
      localize: (s, lang) => {
        if (!s) {
          return s
        }
        return (
          this.i18n[lang][s] ||
          (this.i18n[lang][s.toLowerCase()] &&
            this.i18n[lang][s.toLowerCase()]
              .split("")
              .map(
                (c, idx) =>
                  idx >= s.length || s[idx].toLocaleLowerCase() === s[idx]
                    ? c
                    : c.toLocaleUpperCase()
              )
              .join("")) ||
          s
        ) //Applies the (lower/upper)case to the translated lowercase version of the input string (s)
      }
    }
    return myself
  }
}
exports.IccContactXApi = IccContactXApi
//# sourceMappingURL=icc-contact-x-api.js.map
