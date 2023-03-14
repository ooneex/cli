import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType,
} from "../../types.ts";
import { createProject } from "./create.ts";

export class NewCommand implements ICommand {
  public getActions(): ActionType[] {
    return [];
  }

  public getArgs(): ArgType[] {
    return [];
  }

  public getDescription(): string {
    return "Create Ooneex project";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "new";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex new",
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  public async run(app: CommandType): Promise<Record<string, unknown>> {
    await createProject(app);

    return {};
  }
}
