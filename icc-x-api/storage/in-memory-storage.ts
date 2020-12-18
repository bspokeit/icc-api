export class InMemoryStorage implements Storage {
  private static inMemoryStorage: InMemoryStorage

  private storage: { [key: string]: string } = {}

  constructor() {
    console.log("Intanciating a new InMemoryStorage")
  }

  public static getInstance(): InMemoryStorage {
    if (!InMemoryStorage.inMemoryStorage) {
      InMemoryStorage.inMemoryStorage = new InMemoryStorage()
    }

    return InMemoryStorage.inMemoryStorage
  }

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
