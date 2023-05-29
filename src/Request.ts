import { CommandRequestType, IRequest, ShortFlagKeyType } from "./types.ts";

export class Request implements IRequest {
  public readonly name: string;
  public readonly action: string;
  public readonly args: string[];
  public readonly shortFlags: Record<ShortFlagKeyType, string[]>;
  public readonly longFlags: Record<string, string[]>;

  constructor(command: CommandRequestType) {
    this.name = command.name;
    this.action = command.action;
    this.args = command.args;
    this.shortFlags = command.shortFlags;
    this.longFlags = command.longFlags;
  }
}
