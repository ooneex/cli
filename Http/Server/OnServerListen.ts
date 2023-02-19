import { Figure, IApp, Output, Style } from "../deps.ts";

export const OnServerListen = (hostname: string, port: number, app: IApp) => {
  const output = new Output();
  const figure = new Figure();
  const style = new Style();
  const env = app.env;

  const url = `http${env.isSsl() ? "s" : ""}://${hostname}:${port}/`;

  output.newLine();
  output.writeln("Listening on :");
  output.info(`${figure.arrowRight()} ${url}`, false);
  output.newLine(2);
  style.underline();
  output.writeln("ENVIRONMENTS VARIABLES", style);
  style.reset().color("blue");

  const envData = env.getData();

  Object.keys(envData).map((key) => {
    output.writeln(`${key}: ${envData[key]}`, style);
  });

  output.newLine();

  // TODO: Log app start information
};
