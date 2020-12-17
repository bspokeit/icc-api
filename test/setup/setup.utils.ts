import { nodeFetch } from "../../node-compat"

const DEFAULT_USER = require("./templates/user.json")
const DEFAULT_HCP = require("./templates/hcp.json")
const DEFAULT_PARENT = require("./templates/parent.json")

const COUCHDB_URL = "http://localhost:5984"
const DB_AUTHENTICATION_HEADER = `Basic ${Buffer.from("<username>:<password>").toString("base64")}`
;(async () => {
  console.log("Check or setup minimal DB content...")

  //  Default user
  await nodeFetch(`${COUCHDB_URL}/icure-base/${DEFAULT_USER._id}`, {
    method: "get",
    headers: { Authorization: DB_AUTHENTICATION_HEADER }
  })
    .then(res => res.json())
    .then(response => {
      if (response && response.error === "unauthorized") {
        throw Error(
          'It seems that you did not provide valid DB connnection credential. Please, check the "DB_AUTHENTICATION_HEADER" above.'
        )
      } else if (response && response.error === "not_found") {
        console.log("Default user is missing. Let's add it...")
        return nodeFetch(`${COUCHDB_URL}/icure-base/${DEFAULT_USER._id}`, {
          method: "put",
          headers: { Authorization: DB_AUTHENTICATION_HEADER },
          body: JSON.stringify(DEFAULT_USER)
        })
          .then(res => res.json())
          .then(response => {
            if (response && response.ok) {
              console.log("Default user added !")
            }
          })
      }
    })

  //  Default hcp
  await nodeFetch(`${COUCHDB_URL}/icure-base/${DEFAULT_HCP._id}`, {
    method: "get",
    headers: { Authorization: DB_AUTHENTICATION_HEADER }
  })
    .then(res => res.json())
    .then(response => {
      if (response && response.error === "not_found") {
        console.log("Default hcp is missing. Let's add it...")
        return nodeFetch(`${COUCHDB_URL}/icure-base/${DEFAULT_HCP._id}`, {
          method: "put",
          headers: { Authorization: DB_AUTHENTICATION_HEADER },
          body: JSON.stringify(DEFAULT_HCP)
        })
          .then(res => res.json())
          .then(response => {
            if (response && response.ok) {
              console.log("Default hcp added !")
            }
          })
      }
    })

  //  Default parent
  await nodeFetch(`${COUCHDB_URL}/icure-base/${DEFAULT_PARENT._id}`, {
    method: "get",
    headers: { Authorization: DB_AUTHENTICATION_HEADER }
  })
    .then(res => res.json())
    .then(response => {
      if (response && response.error === "not_found") {
        console.log("Default parent is missing. Let's add it...")
        return nodeFetch(`${COUCHDB_URL}/icure-base/${DEFAULT_PARENT._id}`, {
          method: "put",
          headers: { Authorization: DB_AUTHENTICATION_HEADER },
          body: JSON.stringify(DEFAULT_PARENT)
        })
          .then(res => res.json())
          .then(response => {
            if (response && response.ok) {
              console.log("Default parent added !")
            }
          })
      }
    })
})()

/**
 * The following code is usefull when generating the templates repository content. To run the tests, it is useless for you.
 * If you want to generate new users/hcp content you could use it as an example.
 */
// import { HealthcareParty } from "../../icc-api/model/models";
// import { Api } from "../../icc-x-api"
// import { crypto } from "../../node-compat"

// const fs = require("fs")

// const ICURE_API_URL = "http://localhost:16043/rest/v1"

// const api = Api(ICURE_API_URL, "demo-test-1608210888", "test", crypto)

// const handleKeys = async (hcp: HealthcareParty) => {
//   try {
//     // Generate the Key pair
//     const keyPair = (await api.cryptoApi.RSA.generateKeyPair()) as CryptoKeyPair
//     const exportedKeyPairJwk = await api.cryptoApi.RSA.exportKeys(keyPair, 'jwk', 'jwk');
//     const exportedKeyPairSpki = await api.cryptoApi.RSA.exportKeys(keyPair, "pkcs8", "spki")

//     // Load private key in local storage for direct further usage (such as initKeysForDelegation)
//     await api.cryptoApi.RSA.storeKeyPair(hcp.id!!, exportedKeyPairJwk);

//     // Save the public key in the HCP
//     const publicKey = api.cryptoApi.utils.ua2hex(exportedKeyPairSpki.publicKey as ArrayBuffer)
//     hcp.publicKey = publicKey
//     hcp.hcPartyKeys = {}
//     await api.healthcarePartyApi.modifyHealthcareParty(hcp)

//     // Save the public key in a file
//     fs.writeFileSync(`./test/setup/templates/keys/${hcp.id}-public-2048-hex.key`, publicKey)

//     // Save the private key in a files (one ready to use for test and one for manual import)
//     const privateKey = api.cryptoApi.utils.ua2hex(exportedKeyPairSpki.privateKey as ArrayBuffer)
//     fs.writeFileSync(`./test/setup/templates/keys/${hcp.id}.json`, `{"${hcp.id}": "${privateKey}"}`)
//     fs.writeFileSync(`./test/setup/templates/keys/${hcp.id}-private-2048-hex.key`, privateKey)
//   } catch (e) {
//     console.log(e)
//   }
// }

// const initKeysForDelegation = async (hcp: HealthcareParty) => {
//   // Set the delegation keys
//   await api.cryptoApi.generateKeyForDelegate(hcp.id!!, hcp.id!!)

//   if( hcp.parentId){
//     await api.cryptoApi.generateKeyForDelegate(hcp.id!!, hcp.parentId)
//   }
// }

// ;(async () => {
//   const defaultHcp = await api.healthcarePartyApi.getCurrentHealthcareParty()
//   const defaultParent = await api.healthcarePartyApi.getHealthcareParty(defaultHcp?.parentId || "fake_id", true)

//   await handleKeys(defaultHcp)
//   await handleKeys(defaultParent)

//   await initKeysForDelegation(defaultHcp)
//   await initKeysForDelegation(defaultParent)
// })()
