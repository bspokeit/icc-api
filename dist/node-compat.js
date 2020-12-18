"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const tmp = require("os").tmpdir()
const util = require("util")
exports.crypto = require("crypto").webcrypto
const node_fetch_1 = require("node-fetch")
global.localStorage = new (require("node-localstorage")).LocalStorage(tmp, 5 * 1024 * 1024 * 1024)
global.fetch = node_fetch_1.default
global.Storage = ""
global.TextDecoder = util.TextDecoder
global.TextEncoder = util.TextEncoder
global.btoa = arg => Buffer.from(arg).toString("base64")
global.atob = arg => Buffer.from(arg, "base64").toString()
exports.nodeFetch = node_fetch_1.default
//# sourceMappingURL=node-compat.js.map
