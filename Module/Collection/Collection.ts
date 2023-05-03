import { Helper } from "../Helper/mod.ts";
import { CallbackFnType, CollectionKeyType, ICollection } from "./mod.ts";

export class Collection<K extends CollectionKeyType = string, V = unknown>
  extends Map
  implements ICollection<K, V> {
  public count(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.count() === 0;
  }

  public search(search: RegExp): Collection<K, V> {
    const result = new Collection<K, V>();

    for (const [key, value] of this) {
      if (!Helper.isString(key)) {
        return result;
      }

      if (search.test(key as string)) {
        result.set(key, value);
      }
    }

    return result;
  }

  public filter(callbackFn: CallbackFnType<K, V>): Collection<K, V> {
    const result = new Collection<K, V>();

    for (const [key, value] of this) {
      if (callbackFn(value, key, this)) {
        result.set(key, value);
      }
    }

    return result;
  }

  public find(callbackFn: CallbackFnType<K, V>): Collection<K, V> | null {
    const result = new Collection<K, V>();

    for (const [key, value] of this) {
      if (callbackFn(value, key, this)) {
        result.set(key, value);

        return result;
      }
    }

    return null;
  }

  public first(): { key: K; value: V } | null {
    for (const [key, value] of this) {
      return { key, value };
    }

    return null;
  }

  public toJson(): { [K in CollectionKeyType]: V } {
    const result: { [K in CollectionKeyType]: V } = {};

    for (const [key, value] of this) {
      if (!Helper.isString(key)) {
        return result;
      }

      result[key] = value;
    }

    return result;
  }

  public add(key: K, value: V): this {
    return this.set(key, value);
  }

  public remove(key: K): boolean {
    return this.delete(key);
  }

  public setData(data: { [K in CollectionKeyType]: V }): this {
    Object.keys(data).forEach((datum) => this.set(datum, data[datum]));

    return this;
  }
}
