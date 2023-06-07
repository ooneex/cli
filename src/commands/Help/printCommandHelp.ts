import { Figure, get, ICollection, Output, Style } from "../../deps.ts";
import { Keys } from "../../Keys.ts";
import { CommandDefinitionType } from "../../types.ts";
import { HelpCommandException } from "./HelpCommandException.ts";

export const printCommandHelp = (name: string): void => {
  const commands = get<ICollection<string, CommandDefinitionType>>(
    Keys.Commands,
  );

  const def = commands.get(name);

  if (!def) {
    throw new HelpCommandException(`Command "${name}" not found`);
  }

  const output = new Output();
  const style = new Style();

  output.newLine();
  style.bold().color("blue");
  let title = style.render(
    `${def.name.toUpperCase()} COMMAND`,
  );
  style.reset().color("gray");
  title += style.render(` [${def.version}]`);
  output.write(title);

  output.newLine();
  style.reset();
  output.writeln(style.render(def.description));

  // Actions
  const actions = def.actions;
  if (actions.length > 0) {
    output.newLine();
    style.reset().underline();
    output.writeln(style.render("COMMAND ACTIONS"));
    output.newLine();
    style.reset().color("gray");
    actions.map((action) => {
      style.reset().color("blue");
      output.writeln(style.render(`${def.name}:${action.name}`));
      style.reset().color("gray");
      output.writeln(style.render(`${action.description}`));
      output.newLine();
    });
  }

  // Arguments
  const args = def.args ?? [];
  if (args.length > 0) {
    output.newLine();
    style.reset().underline();
    output.writeln(style.render("COMMAND ARGUMENTS"));
    output.newLine();
    style.reset().color("gray");
    args.map((arg) => {
      style.reset().color("blue");
      output.writeln(
        style.render(arg.required ? `${arg.name}` : `[${arg.name}]`),
      );
      style.reset().color("gray");
      output.writeln(style.render(`${arg.description}`));
      output.write(style.render(Figure.squareFilled()));
      output.write(style.render(` Required: ${!!arg.required}`));
      if (arg.constraint) {
        output.write(style.render(`    ${Figure.squareFilled()}`));
        output.write(style.render(` Constraint: ${arg.constraint}`));
      }

      output.newLine(2);
    });
  }

  // Options
  const options = [...(def.shortFlags ?? []), ...(def.longFlags ?? [])];
  if (options.length > 0) {
    output.newLine();
    style.reset().underline();
    output.writeln(style.render("COMMAND OPTIONS"));
    output.newLine();
    style.reset().color("gray");
    options.map((option) => {
      let dash = "--";
      if (option.name.length === 1) {
        dash = "-";
      }
      style.reset().color("blue");
      output.writeln(
        style.render(
          option.required ? `${dash}${option.name}` : `[${dash}${option.name}]`,
        ),
      );
      style.reset().color("gray");
      output.writeln(style.render(`${option.description}`));
      output.write(style.render(Figure.squareFilled()));
      output.write(style.render(` Required: ${!!option.required}`));
      if (option.constraint) {
        output.write(style.render(`    ${Figure.squareFilled()}`));
        output.write(style.render(` Constraint: ${option.constraint}`));
      }

      output.newLine(2);
    });
  }

  // Usages
  const usages = def.usage;
  if (usages.length > 0) {
    output.newLine();
    style.reset().underline();
    output.writeln(style.render("COMMAND USAGES"));
    output.newLine();
    style.reset().color("gray");
    usages.map((usage) => {
      output.writeln(style.render(`${Figure.arrowRight()} ${usage}`));
    });
  }
};
