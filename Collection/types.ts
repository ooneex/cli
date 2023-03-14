// export type CollectionKeyType = string | number | symbol;
export type CollectionKeyType = string;

export interface ICollection<K = string, V = unknown> {
  map(fn: (value: V, key: K) => void): this;
  get<T>(key: K): T | undefined;
  has(key: K): boolean;
  hasData(): boolean;
  entries(): K[];
  keys(): K[];
  values(): V[];
  count(): number;
  getData(): { [K in CollectionKeyType]: V };
  search(search: RegExp): ICollection<K, V>;
}
