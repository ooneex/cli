import { Row, Table} from "../../deps.ts";
import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType
} from "../../types.ts";
import {HelpCommandException} from "./HelpCommandException.ts";

export class HelpCommand implements ICommand {
  public getActions(): ActionType[] {
    return [];
  }

  public getArgs(): ArgType[] {
    return [
      {name: "command", description: "Print help for other command"}
    ];
  }

  public getDescription(): string {
    return "Print help for Ooneex command line";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "help";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex -h",
      "ooneex --help",
      "ooneex help",
      "ooneex help [command]",
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  private printCommandHelp(arg: string, app: CommandType): boolean {
    const command = app.container.get<ICommand>(arg);

    if (!command) {
      throw new HelpCommandException(`Command "${arg}" not found`);
    }

    const output = app.output;
    const style = app.style;
    const figure = app.figure;

    output.newLine();
    style.bold().color("blue");
    output.write(command.getName(), style);
    style.reset().color("gray");
    output.writeln(` v${command.getVersion()}`, style);
    style.reset();
    output.writeln(command.getDescription(), style);
    output.newLine();

    // Actions
    const actions = command.getActions();
    if (actions.length > 0) {
      output.newLine();
      style.reset().underline();
      output.writeln("COMMAND ACTIONS", style);
      output.newLine();
      style.reset().color("gray");
      actions.map((action) => {
        style.reset().color("blue");
        output.writeln(`${command.getName()}:${action.name}`, style);
        style.reset().color("gray");
        output.writeln(`${action.description}`, style);
        output.newLine();
      });
    }

    // Arguments
    const args = command.getArgs();
    if (args.length > 0) {
      output.newLine();
      style.reset().underline();
      output.writeln("COMMAND ARGUMENTS", style);
      output.newLine();
      style.reset().color("gray");
      args.map((arg) => {
        style.reset().color("blue");
        output.writeln(arg.required ? `${arg.name}` : `[${arg.name}]`, style);
        style.reset().color("gray");
        output.writeln(`${arg.description}`, style);
        output.write(figure.squareFilled(), style);
        output.write(` Required: ${!!arg.required}`, style);
        if (arg.constraint) {
          output.write(`    ${figure.squareFilled()}`, style);
          output.write(` Constraint: ${arg.constraint}`, style);
        }

        output.newLine(2);
      });
    }

    // Options
    const options = [...command.getShortFlags(), ...command.getLongFlags()];
    if (options.length > 0) {
      output.newLine();
      style.reset().underline();
      output.writeln("COMMAND OPTIONS", style);
      output.newLine();
      style.reset().color("gray");
      options.map((option) => {
        let dash = "--";
        if (option.name.length === 1) {
          dash = "-";
        }
        style.reset().color("blue");
        output.writeln(option.required ? `${dash}${option.name}` : `[${dash}${option.name}]`, style);
        style.reset().color("gray");
        output.writeln(`${option.description}`, style);
        output.write(figure.squareFilled(), style);
        output.write(` Required: ${!!option.required}`, style);
        if (option.constraint) {
          output.write(`    ${figure.squareFilled()}`, style);
          output.write(` Constraint: ${option.constraint}`, style);
        }

        output.newLine(2);
      });
    }

    // Usages
    const usages = command.getUsage();
    if (usages.length > 0) {
      output.newLine();
      style.reset().underline();
      output.writeln("COMMAND USAGES", style);
      output.newLine();
      style.reset().color("gray");
      usages.map((usage) => {
        output.writeln(`${figure.arrowRight()} ${usage}`, style);
      });
    }

    return true;
  }

  public run<T = boolean>(app: CommandType): T {
    const arg = app.args[0];
    if (arg) {
      return this.printCommandHelp(arg, app) as T;
    }

    const output = app.output;
    const style = app.style;
    const figure = app.figure;

    const table = new Table();
    app.style.color("blue");

    table.header(Row.from([
      style.render("Name"),
      style.render("Description"),
      style.render("Usage")
    ]).align("center"));

    style.color("gray");
    app.container.map((command) => {
      const usages = command.getUsage().map((usage) => {
        return `${figure.arrowRight()} ${style.render(usage)}`
      });

      table.push([
        command.getName(),
        command.getDescription(),
        usages.join("\n"),
      ]);
    });

    style.reset();

    output.newLine();

    table.align("left").border(true).render();

    return true as T;
  }
}
