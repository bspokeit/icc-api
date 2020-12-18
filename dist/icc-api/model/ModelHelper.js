"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
function decodeBase64(v) {
  if (v instanceof ArrayBuffer) {
    return v
  }
  if (v instanceof Uint8Array) {
    return v.buffer
  }
  if (typeof v === "string") {
    const bs = atob(v)
    var data = new Uint8Array(bs.length)
    for (let i = 0; i < bs.length; i++) {
      data[i] = bs.charCodeAt(i)
    }
    return data.buffer
  }
  return v
}
exports.decodeBase64 = decodeBase64
//# sourceMappingURL=ModelHelper.js.map
