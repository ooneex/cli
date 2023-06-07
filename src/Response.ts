import { Collection, IException } from "./deps.ts";
import { IResponse } from "./types.ts";

export class Response implements IResponse {
  private status = 200;
  private exception: IException | null = null;
  readonly data: Collection<string | number, unknown> = new Collection<
    string | number,
    unknown
  >();

  public getStatus(): number {
    return this.status;
  }

  public getException(): IException | null {
    return this.exception;
  }
}
