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

export class ComponentCommand implements ICommand {
  public getActions(): ActionType[] {
    return [
      { name: "new", description: "Create new component" },
      { name: "create", description: "Create new component" },
    ];
  }

  public getArgs(): ArgType[] {
    return [];
  }

  public getDescription(): string {
    return "Manage component for Ooneex application";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "component";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex component:new",
      "ooneex component:create",
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
