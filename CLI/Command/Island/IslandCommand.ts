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

export class IslandCommand implements ICommand {
  public getActions(): ActionType[] {
    return [
      { name: "new", description: "Create new island" },
      { name: "create", description: "Create new island" },
    ];
  }

  public getArgs(): ArgType[] {
    return [];
  }

  public getDescription(): string {
    return "Manage island for Ooneex application";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "island";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex island:new",
      "ooneex island:create",
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
