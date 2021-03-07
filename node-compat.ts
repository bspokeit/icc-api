const tmp = require("os").tmpdir()
const util = require("util")

export const crypto = require("crypto").webcrypto

import fetch from "node-fetch"
;(global as any).localStorage = new (require("node-localstorage")).LocalStorage(
  tmp,
  5 * 1024 * 1024 * 1024
)
;(global as any).fetch = fetch
;(global as any).Storage = ""
;(global as any).TextDecoder = util.TextDecoder
;(global as any).TextEncoder = util.TextEncoder
;(global as any).btoa = (arg: any) => Buffer.from(arg).toString("base64")
;(global as any).atob = (arg: any) => Buffer.from(arg, "base64").toString()

export const nodeFetch = fetch
