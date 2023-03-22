import { Helper } from "./deps.ts";
import { CollectionKeyType, ICollection } from "./types.ts";

export class Collection<K extends CollectionKeyType = string, V = unknown>
  implements ICollection<K, V> {
  private data: { [K in CollectionKeyType]: V } = {};

  /**
   * Set multiple values
   */
  public set(value: { [K in CollectionKeyType]: V }): this {
    Object.keys(value).map((key) => {
      this.data[key] = value[key];
    });

    return this;
  }

  public add(key: K, value: V): this {
    if (!this.has(key)) {
      this.data[key] = value;
    } else {
      this.data[key] = value;
    }

    return this;
  }

  /**
   * Get by key or by chained key (e.g. "user.name")
   */
  public get<T>(key: K): T | undefined {
    return Helper.getByKey(this.data, key);
  }

  public count(): number {
    return this.keys().length;
  }

  /**
   * Check by key or by chained key (ex. "user.name")
   */
  public has(key: K): boolean {
    return Helper.hasProperty(this.data, key);
  }

  public hasData(): boolean {
    return this.count() > 0;
  }

  public keys(): K[] {
    return Object.keys(this.data) as K[];
  }

  public values(): V[] {
    return Object.values(this.data);
  }

  public map(fn: (value: V, key: K) => void): this {
    const keys = this.keys();

    keys.map((entry) => {
      fn(this.data[entry], entry);
    });

    return this;
  }

  public delete(key: K): boolean {
    if (!this.has(key)) {
      return false;
    }
    delete this.data[key];

    return true;
  }

  public remove(key: K): boolean {
    return this.delete(key);
  }

  public clear(): this {
    this.data = {};

    return this;
  }

  /**
   * Get all data from the collection
   */
  public getData(): { [K in CollectionKeyType]: V } {
    return this.data;
  }

  /**
   * Set new data for the collection (replace old data)
   */
  public setData(data: { [K in CollectionKeyType]: V }): this {
    this.data = data;

    return this;
  }

  /**
   * Search in collection by key
   */
  public search(search: RegExp): ICollection<K, V> {
    const searchCollection = new Collection<K, V>();
    this.map((value, key) => {
      if (search.test(key as string)) {
        searchCollection.add(key, value);
      }
    });

    return searchCollection;
  }
}
