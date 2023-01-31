export interface IYamlParser {
  parse(path: string): void;
  get<T>(key: string): T | undefined;
  getData<T>(): T;
}
