import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType,
} from "../../types.ts";
import { create } from "./create.ts";

export class ViewCommand implements ICommand {
  public getActions(): ActionType[] {
    return [
      { name: "new", description: "Create new view" },
      { name: "create", description: "Create new view" },
    ];
  }

  public getArgs(): ArgType[] {
    return [];
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
      "ooneex view:create",
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  public async run(app: CommandType): Promise<Record<string, unknown>> {
    switch (app.action) {
      case "new":
      case "create":
        return await create(app);
    }

    return {};
  }
}
