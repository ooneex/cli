import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType
} from "../../types.ts";
import {VersionCommandException} from "./VersionCommandException.ts";

export class VersionCommand implements ICommand {
  public getActions(): ActionType[] {
    return [];
  }

  public getArgs(): ArgType[] {
    return [
      {name: "command", description: "Print other command line version"},
    ];
  }

  public getDescription(): string {
    return "Print Ooneex command line version";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "version";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex -v",
      "ooneex --version",
      "ooneex version",
      "ooneex version [command]",
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  public run<T = CommandVersionType>(app: CommandType): T {
    let version = this.getVersion();
    const arg = app.args[0];

    if (arg) {
      const command = app.container.get<ICommand>(arg);

      if (!command) {
        throw new VersionCommandException(`Command "${arg}" not found`);
      }

      version = command.getVersion();
      app.output.writeln(`${command.getName()} ${version}`);

      return version as T;
    }

    app.output.writeln(`ooneex ${this.getVersion()}`);

    return version as T;
  }
}
