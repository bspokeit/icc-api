"use strict"
/**
 * Several pieces of the icc-api rely on the existence of a LocalStorage.
 *
 * For instance, encryption and decrytion keys are supposed to be stored in such storage so that the user will not have to
 * load them eachtime an encrpytion or decryption has to be performed.
 *
 * The existence of such storage is platform dependent. HTML5 Compatible browser do indeed provide such storage: the browser localStorage.
 *
 * Yet, the icc-api might be used in a non browser based platform:
 *  1. Tests might not be run within a browser context
 *  2. A mobile application could want to use the icc-api
 *  3. The icc-api could as well be used in a backend context where no genuine localStorage is provided
 *
 * The prupose of the following Proxy like class is to:
 *
 *  1. Hold a instance of a storage implementing the Storage Web Storage API interface
 *  2. Be able to access the default HTML5 Compatible localStorage if present
 *  3. Proxy any storage related request to either the defined storage instance or the default localStorage if present
 */
Object.defineProperty(exports, "__esModule", { value: true })
class LocalStorageProxy {
  constructor(storage) {
    this.length = this.getStorage().length
    this.storage = storage
  }
  /**
   * getStorage returns the initialized private storage defined in the proxy at intanciation
   * or return a possible default storage provided by getDefaultStorage().
   */
  getStorage() {
    return this.storage || this.getDefaultStorage()
  }
  /**
   * getDefaultStorage static method checks if a default storage is available and returns it if it exists.
   * If no such default storage is present, the method throw an error assuming the default storage is provided
   * by a HTML5 Browser Local Storage.
   * @param storage
   */
  getDefaultStorage() {
    if (typeof Storage === "undefined") {
      console.log("Your browser does not support HTML5 Browser Local Storage !")
      throw "Your browser does not support HTML5 Browser Local Storage !"
    }
    return localStorage
  }
  clear() {
    this.getStorage().clear()
  }
  getItem(key) {
    return this.getStorage().getItem(key)
  }
  key(index) {
    return this.getStorage().key(index)
  }
  removeItem(key) {
    this.getStorage().removeItem(key)
  }
  setItem(key, value) {
    this.getStorage().setItem(key, value)
  }
}
exports.LocalStorageProxy = LocalStorageProxy
//# sourceMappingURL=storage.js.map
