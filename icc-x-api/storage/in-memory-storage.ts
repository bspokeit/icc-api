export class InMemoryStorage implements Storage {
  private storage: { [key: string]: string } = {}

  constructor() {}

  length: number = 0

  clear(): void {
    this.storage = {}
    this.length = Object.keys(this.storage).length
  }

  getItem(key: string): string | null {
    return this.storage[key]
  }

  key(index: number): string | null {
    const storageKeys: string[] = Object.keys(this.storage)

    if (index < 0 || !storageKeys.length || index >= storageKeys.length) {
      return null
    }

    return storageKeys[index]
  }

  removeItem(key: string): void {
    delete this.storage[key]
    this.length = Object.keys(this.storage).length
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value
    this.length = Object.keys(this.storage).length
  }
}
