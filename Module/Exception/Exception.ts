import { Collection, ICollection } from "../Collection/mod.ts";
import { IException } from "./types.ts";

export class Exception extends Error implements IException {
  public readonly data: ICollection;

  constructor(message: string, data?: Record<string, unknown>) {
    super(message);

    const collection = new Collection();

    if (data) {
      collection.setData(data);
    }

    this.data = collection;
  }

  public getName(): string {
    // @ts-ignore: trust me
    return this.constructor.name;
  }

  public getMessage(): string {
    return this.message;
  }
}
