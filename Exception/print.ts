import { Exception } from "./Exception.ts";
import { Figure, Output } from "./deps.ts";
import { IException } from "./types.ts";

export const print = (
  error: IException | Error,
  printStack = true,
) => {
  const output = new Output();

  if (!(error instanceof Exception)) {
    error = new Exception(error);
  }

  const exception = error as IException;

  output.newLine();
  output.writeln(`${error.name}`, "color: red; font-weight: bold");
  output.writeln(`${Figure.cross()} ${error.message}`);
  if (exception.status) {
    output.writeln(
      `${Figure.circleFilled()} status: ${exception.status}`,
      "color: grey",
    );
  }

  if (!printStack) {
    return;
  }

  output.writeln(`Threw in`, "color: white; font-weight: bold");
  output.writeln(
    `${Figure.arrowRight()} ${exception.file} ${exception.line}:${exception.column}`,
  );

  const data = exception.getData<Record<string, string> | null>();

  if (data) {
    output.writeln(`Debug`, "color: white; font-weight: bold");

    Object.keys(data).map((datum) => {
      output.writeln(
        `${Figure.bullet()} ${datum}: ${
          (data as Record<string, string>)[datum]
        }`,
        "color: orange",
      );
    });
  }

  if (exception.stacks.length > 1) {
    output.writeln(`Stack trace`, "color: white; font-weight: bold");
    let space = 0;
    exception.stacks.forEach((stack, index) => {
      if (index === 0) {
        return;
      }

      output.writeln(
        `${" ".repeat(space)}${stack.file} ${stack.line}:${stack.column}`,
      );
      space += 2;
    });
  }
};
