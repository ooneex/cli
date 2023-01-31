import { Helper } from "./deps.ts";
import { CollectionKeyType, ICollection } from "./types.ts";

export class Collection<K extends CollectionKeyType, V>
  implements ICollection<K, V> {
  protected data: { [K in CollectionKeyType]: V } = {};

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
   * Get by key or by chained key (ex. "user.name")
   */
  public get<T>(key: K): T | undefined {
    return Helper.getByKey(this.data, key);
  }

  public count(): number {
    return this.entries().length;
  }

  /**
   * Check by key or by chained key (ex. "user.name")
   */
  public has(key: K): boolean {
    return Helper.hasProperty(this.data, key);
  }

  public entries(): K[] {
    return Object.keys(this.data) as K[];
  }

  public keys(): K[] {
    return this.entries();
  }

  public values(): V[] {
    return Object.values(this.data);
  }

  public map(fn: (value: V, key: K) => void): this {
    const entries = this.entries();

    entries.map((entry) => {
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
   * Set new data for the collection
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
