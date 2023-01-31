import { Helper, parse } from "../deps.ts";
import { IYamlParser } from "./types.ts";
import { YamlParseFailedException } from "./YamlParseFailedException.ts";

export class YamlParser implements IYamlParser {
  private data: unknown;

  constructor(fileContent: string) {
    this.parse(fileContent);
  }

  public parse(fileContent: string): void {
    try {
      this.data = parse(fileContent);
    } catch (e) {
      throw new YamlParseFailedException(e.message);
    }
  }

  public get<T>(key: string): T | undefined {
    return Helper.getByKey<T>(this.data, key);
  }

  public getData<T>(): T {
    return this.data as T;
  }
}
