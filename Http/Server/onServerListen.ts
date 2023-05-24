import {
  DotEnvValueType,
  EnvHelper,
  Figure,
  get,
  ICollection,
  Keys,
  Output,
} from "../deps.ts";

export const onServerListen = (hostname: string, port: number) => {
  const output = new Output();
  const envHelper = get<EnvHelper>(Keys.Env.Helper);

  const url = `http${envHelper.isSecure() ? "s" : ""}://${hostname}:${port}`;

  output.newLine();
  output.writeln("Listening on :", "font-weight: bold");
  output.info(`${Figure.arrowRight()} ${url}`, null, false);

  const env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);

  if (envHelper.isDebug()) {
    output.newLine(2);
    output.writeln("ENVIRONMENTS VARIABLES", "text-decoration: underline");

    for (const [key, value] of env) {
      output.write(`${key}: ${value}`, "color: gray");
    }

    output.newLine();
  }
};
