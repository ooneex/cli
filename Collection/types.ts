// export type CollectionKeyType = string | number | symbol;
export type CollectionKeyType = string;

export interface ICollection<K, V> {
  clear(): this;
  delete(key: K): boolean;
  remove(key: K): boolean;
  map(fn: (value: V, key: K) => void): this;
  get<T>(key: K): T | undefined;
  has(key: K): boolean;
  set(value: { [K in CollectionKeyType]: V }): this;
  add(key: K, value: V): this;
  entries(): K[];
  keys(): K[];
  values(): V[];
  count(): number;
  getData(): { [K in CollectionKeyType]: V };
  search(search: RegExp): ICollection<K, V>;
}
