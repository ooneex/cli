import { CommandActionException } from "./CommandActionException.ts";
import { CommandArgumentException } from "./CommandArgumentException.ts";
import { CommandFlagException } from "./CommandFlagException.ts";
import { Exception, Helper } from "./deps.ts";
import { CommandNotFoundException } from "./CommandNotFoundException.ts";
import { container } from "./Container.ts";
import { CommandRequestType, ICommand } from "./types.ts";

export const commandChecker = (request: CommandRequestType): ICommand => {
  const command: ICommand | null = container.get(request.name) ?? null;

  if (!command) {
    const error = new CommandNotFoundException(
      `Command "${request.name}" not found`,
    );
    Exception.print(error, false);
    Deno.exit(1);
  }

  checkAction(request, command);
  checkArgs(request, command);
  checkShortFlags(request, command);
  checkLongFlags(request, command);

  return command;
};

export const checkAction = (
  request: CommandRequestType,
  command: ICommand,
): void => {
  const actions = command.getActions();
  const suggestions: string[] = [];
  actions.map((action) => {
    suggestions.push(`${command.getName()}:${action.name}`);
  });
  const suggestion = `"${suggestions.join('" or "')}"`;

  if (actions.length > 0) {
    if (!request.action) {
      throw new CommandActionException(`Action is required. Try ${suggestion}`);
    }

    const action = actions.find((a) => a.name === request.action);

    if (!action) {
      throw new CommandActionException(
        `Action "${request.action}" not allowed. Try ${suggestion}`,
      );
    }
  }

  if (actions.length === 0 && request.action) {
    throw new CommandActionException(
      `Action not allowed. Try "${command.getName()}"`,
    );
  }
};

export const checkArgs = (
  request: CommandRequestType,
  command: ICommand,
): void => {
  const args = command.getArgs();

  if (args.length > 0) {
    const requiredArgs = args.filter((arg) => arg.required);

    if (requiredArgs.length > request.args.length) {
      let text = "1 argument is required";
      if (requiredArgs.length > 1) {
        text = `${requiredArgs.length} arguments are required`;
      }

      throw new CommandArgumentException(text);
    }

    if (request.args.length > args.length) {
      let text = "1 argument is allowed";
      if (args.length > 1) {
        text = `${args.length} arguments are allowed`;
      }

      throw new CommandArgumentException(`Too many arguments. ${text}`);
    }

    request.args.map((value, index) => {
      const constraint = args[index].constraint;

      if (constraint && !constraint.test(value)) {
        throw new CommandArgumentException(
          `Argument "${value}" must match with "${constraint}"`,
        );
      }
    });
  }

  if (args.length === 0 && request.args.length > 0) {
    throw new CommandArgumentException(`Argument not allowed`);
  }
};

export const checkShortFlags = (
  request: CommandRequestType,
  command: ICommand,
): void => {
  const shortFlags = command.getShortFlags();

  if (shortFlags.length > 0) {
    shortFlags.map((flag) => {
      if (flag.required && !Helper.hasProperty(request.shortFlags, flag.name)) {
        throw new CommandFlagException(`Flag "-${flag.name}" is required`);
      }

      const constraint = flag.constraint ?? null;

      if (constraint) {
        if (!request.shortFlags[flag.name]) {
          return;
        }

        request.shortFlags[flag.name].map((value) => {
          if (!constraint.test(value)) {
            throw new CommandFlagException(
              `Flag "-${flag.name}" must match with "${constraint}"`,
            );
          }
        });
      }
    });
  }

  Object.keys(request.shortFlags).map((name) => {
    const flag = shortFlags.find((f) => f.name === name);

    if (!flag) {
      throw new CommandFlagException(`Flag "-${name}" not allowed`);
    }
  });
};

export const checkLongFlags = (
  request: CommandRequestType,
  command: ICommand,
): void => {
  const longFlags = command.getLongFlags();

  if (longFlags.length > 0) {
    longFlags.map((flag) => {
      if (flag.required && !Helper.hasProperty(request.longFlags, flag.name)) {
        throw new CommandFlagException(`Flag "--${flag.name}" is required`);
      }

      const constraint = flag.constraint ?? null;

      if (constraint) {
        if (!request.longFlags[flag.name]) {
          return;
        }

        request.longFlags[flag.name].map((value) => {
          if (!constraint.test(value)) {
            throw new CommandFlagException(
              `Flag "--${flag.name}" must match with "${constraint}"`,
            );
          }
        });
      }
    });
  }

  Object.keys(request.longFlags).map((name) => {
    const flag = longFlags.find((f) => f.name === name);

    if (!flag) {
      throw new CommandFlagException(`Flag "--${name}" not allowed`);
    }
  });
};
