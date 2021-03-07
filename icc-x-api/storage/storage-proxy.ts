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

import { InMemoryStorage } from "./in-memory-storage"

export class LocalStorageProxy implements Storage {
  private static instance: LocalStorageProxy

  private storage: Storage

  private constructor() {
    if (typeof Storage !== "undefined") {
      this.storage = localStorage
    }

    console.log("Your browser does not support HTML5 Browser Local Storage !")
    console.log("Proxying to a in memory storage...")

    this.storage = new InMemoryStorage()
  }

  public static getInstance(): LocalStorageProxy {
    if (!LocalStorageProxy.instance) {
      LocalStorageProxy.instance = new LocalStorageProxy()
    }

    return LocalStorageProxy.instance
  }

  /**
   * getStorage returns the initialized private storage defined in the proxy at intanciation
   * or return a possible default storage provided by getDefaultStorage().
   */
  private getStorage(): Storage {
    return this.storage
  }

  public length: number = this.getStorage() ? this.getStorage().length : 0

  public clear(): void {
    this.getStorage().clear()
  }

  public getItem(key: string): string | null {
    return this.getStorage().getItem(key)
  }

  public key(index: number): string | null {
    return this.getStorage().key(index)
  }

  public removeItem(key: string): void {
    this.getStorage().removeItem(key)
  }

  public setItem(key: string, value: string): void {
    this.getStorage().setItem(key, value)
  }
}
