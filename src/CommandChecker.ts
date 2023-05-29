import { Helper } from "../deps.ts";
import { CommandActionException } from "./CommandActionException.ts";
import { CommandArgumentException } from "./CommandArgumentException.ts";
import { CommandFlagException } from "./CommandFlagException.ts";
import { CommandDefinitionType, IRequest, ShortFlagKeyType } from "./types.ts";

export class CommandChecker {
  constructor(
    private request: IRequest,
    private definition: CommandDefinitionType,
  ) {
  }

  public isValid(): boolean {
    this.checkAction();
    this.checkArgs();
    this.checkShortFlags();
    this.checkLongFlags();

    return true;
  }

  public checkAction(): boolean {
    const command = this.definition;

    const actions = command.actions;
    const suggestions: string[] = [];
    actions.map((action) => {
      suggestions.push(`${command.name}:${action.name}`);
    });
    const suggestion = `"${suggestions.join('" or "')}"`;

    if (actions.length > 0) {
      if (!this.request.action) {
        throw new CommandActionException(
          `Action is required. Try ${suggestion}`,
        );
      }

      const action = actions.find((a) => a.name === this.request.action);

      if (!action) {
        throw new CommandActionException(
          `Action "${this.request.action}" not allowed. Try ${suggestion}`,
        );
      }
    }

    if (actions.length === 0 && this.request.action) {
      throw new CommandActionException(
        `Action not allowed. Try "${command.name}"`,
      );
    }

    return true;
  }

  public checkArgs(): boolean {
    const request = this.request;
    const command = this.definition;
    const args = command.args ?? [];

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

    return true;
  }

  public checkShortFlags(): boolean {
    const request = this.request;
    const command = this.definition;
    const shortFlags = command.shortFlags ?? [];

    if (shortFlags.length > 0) {
      shortFlags.map((flag) => {
        if (
          flag.required && !Helper.hasProperty(request.shortFlags, flag.name)
        ) {
          throw new CommandFlagException(`Flag "-${flag.name}" is required`);
        }

        const constraint = flag.constraint ?? null;

        if (constraint) {
          if (!request.shortFlags[flag.name as ShortFlagKeyType]) {
            return;
          }

          request.shortFlags[flag.name as ShortFlagKeyType].map((value) => {
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

    return true;
  }

  public checkLongFlags(): boolean {
    const request = this.request;
    const command = this.definition;

    const longFlags = command.longFlags ?? [];

    if (longFlags.length > 0) {
      longFlags.map((flag) => {
        if (
          flag.required && !Helper.hasProperty(request.longFlags, flag.name)
        ) {
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

    return true;
  }
}
