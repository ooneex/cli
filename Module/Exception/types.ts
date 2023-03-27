import { ICollection } from "../Collection/mod.ts";

export interface IException {
  readonly data: ICollection;
  getName: () => string;
  getMessage: () => string;
}
