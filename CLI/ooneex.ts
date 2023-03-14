import { commandChecker } from "./checker.ts";
import { CommandLineException } from "./CommandLineException.ts";
import { container } from "./Container.ts";
import { config, Env, Exception, Helper, parseFlags } from "./deps.ts";
import { Figure } from "./Figure/Figure.ts";
import { Output } from "./Output/Output.ts";
import { Style } from "./Style/Style.ts";
import { CommandRequestType, ShortFlagKeyType } from "./types.ts";

const ooneex = async (): Promise<void> => {
  const env = new Env();
  await env.parse();
  await config.parse();

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

  const request: CommandRequestType = {
    name,
    action,
    args,
    shortFlags,
    longFlags,
  };

  const command = commandChecker(request);

  command.run({
    env,
    ...request,
    output: new Output(),
    style: new Style(),
    figure: new Figure(),
    container,
    isApi: () => env.isApi(),
    isFullApp: () => env.isFullApp(),
  });
};

if (import.meta.main) {
  try {
    await ooneex();
  } catch (e) {
    if (e instanceof Exception) {
      Exception.print(e, false);
      Deno.exit(1);
    }

    // if (e instanceof InvalidOptionError) {
    // const error = new InvalidOptionException(e.message);
    // error.fromNativeError(e);
    // Exception.print(error, false);
    // Deno.exit(1);
    // }

    const error = new CommandLineException(e.message);
    error.fromNativeError(e);
    Exception.print(error);

    Deno.exit(1);
  }
}
