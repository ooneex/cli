import { Helper } from "../Helper/mod.ts";
import { CollectionKeyType, ICollection } from "./types.ts";

export class ReadOnlyCollection<
  K extends CollectionKeyType = string,
  V = unknown,
> implements ICollection<K, V> {
  protected data: { [K in CollectionKeyType]: V };

  constructor(data: { [K in CollectionKeyType]: V }) {
    this.data = data;
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

  /**
   * Get all data from the collection
   */
  public getData(): { [K in CollectionKeyType]: V } {
    return this.data;
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

export class Collection<K extends CollectionKeyType = string, V = unknown>
  extends ReadOnlyCollection<K, V> {
  constructor() {
    super({});
  }

  /**
   * Set multiple values
   */
  public set(data: { [K in CollectionKeyType]: V }): this {
    Object.keys(data).map((key) => {
      this.data[key] = data[key];
    });

    return this;
  }

  public add(key: K, value: V): this {
    if (!this.has(key)) {
      this.data[key] = value;
    } else {
      // TODO: push value into the new data
      this.data[key] = value;
    }

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
   * Set new data for the collection (replace old data)
   */
  public setData(data: { [K in CollectionKeyType]: V }): this {
    this.data = data;

    return this;
  }
}

export const collection = new Collection();
