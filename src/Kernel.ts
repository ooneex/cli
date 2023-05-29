import {
  EnvHelper,
  EnvSchema,
  EnvValidationException,
  getOrNull,
  Helper,
  ICollection,
  loadEnv,
  parseFlags,
  registerConstant,
} from "../deps.ts";
import { CommandChecker } from "./CommandChecker.ts";
import { CommandNotFoundException } from "./CommandNotFoundException.ts";
import { Keys } from "./Keys.ts";
import "./loadCommands.ts";
import { Request } from "./Request.ts";
import { Response } from "./Response.ts";
import {
  CommandDefinitionType,
  CommandRequestType,
  ShortFlagKeyType,
} from "./types.ts";

export class Kernel {
  public static boot(): void {
    // Load env vars
    const env = loadEnv();

    const envData = env.toJson();
    const result = EnvSchema.safeParse(envData);

    if (!result.success) {
      const error = result.error.issues[0];

      throw new EnvValidationException(
        `${error.path.join(".")}: ${error.message}`,
      );
    }

    registerConstant(Keys.Env.Default, env);
    registerConstant(Keys.Env.Helper, new EnvHelper(Keys.Env.Default));
  }

  public static run(): void {
    const parseArgs = parseFlags(Deno.args);
    const flags = parseArgs.flags ?? {};
    let args = parseArgs.unknown;

    if (!args || !Helper.isArray(args) || Helper.isEmpty(args)) {
      if (
        Helper.hasProperty(flags, "v") || Helper.hasProperty(flags, "version")
      ) {
        args = ["version"];
        delete flags["v"];
        delete flags["version"];
      } else if (
        Helper.hasProperty(flags, "h") || Helper.hasProperty(flags, "help")
      ) {
        args = ["help"];
        delete flags["h"];
        delete flags["help"];
      } else {
        args = ["help"];
      }
    }

    const commandAndAction = (args.shift() as string).split(":");
    const name = commandAndAction[0];
    const action = commandAndAction[1] ?? null;

    const shortFlags: Record<ShortFlagKeyType | string, string[]> = {};
    const longFlags: Record<string, string[]> = {};

    Object.keys(flags).map((flag) => {
      if (flag.length === 1) {
        shortFlags[flag] = Helper.isArray(flags[flag])
          ? flags[flag]
          : [flags[flag]];
      } else {
        longFlags[flag] = Helper.isArray(flags[flag])
          ? flags[flag]
          : [flags[flag]];
      }
    });

    const commandRequest: CommandRequestType = {
      name,
      action,
      args,
      shortFlags,
      longFlags,
    };

    const request = new Request(commandRequest);
    registerConstant(Keys.Request, request);

    let response = new Response();
    registerConstant(Keys.Response, response);

    const commands = getOrNull<ICollection<string, CommandDefinitionType>>(
      Keys.Commands,
    );

    if (!commands) {
      throw new CommandNotFoundException("No command is registered");
    }

    const command = commands.get(request.name);

    if (!command) {
      throw new CommandNotFoundException(`Command "${request.name}" not found`);
    }

    const checker = new CommandChecker(request, command);
    checker.isValid();

    response = command.run();
  }
}
