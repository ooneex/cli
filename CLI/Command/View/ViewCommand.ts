import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType
} from "../../types.ts";

export class ViewCommand implements ICommand {
  public getActions(): ActionType[] {
    return [
      {name: "new", description: "Create new view"}
    ];
  }

  public getArgs(): ArgType[] {
    return [
      {name: "name", description: "Name of view"}
    ];
  }

  public getDescription(): string {
    return "Handle view for Ooneex application";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "view";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex view:new",
      "ooneex view:new BookListView"
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  public run<T = boolean>(app: CommandType): T {
    const arg = app.args[0];
    // if (arg) {
    //
    // }

    return true as T;
  }
}
