import { EOL, Figure } from "./deps.ts";
import { IOutput } from "./mod.ts";

/**
 * Output
 * This class allows you to print text on terminal.
 *
 * @example
 *
 * ```ts
 *  const output = new Output();
 *
 *  // Simple text
 *  output.write("Hello");
 *
 *  // Text with style
 *  output.write("Hello", "color: yellow");
 *
 *  // Success message with tick
 *  output.success("Hello");
 *
 *  // Success message without tick
 *  output.success("Hello", "text-decoration: underline", false);
 * ```
 */
export class Output implements IOutput {
  /**
   * @inheritDoc IOutput.write
   */
  public write(text: string, style: string | null = null): this {
    console.log(`${style ? "%c" : ""}${text}`, style || "");

    return this;
  }

  /**
   * @inheritDoc IOutput.writeln
   */
  public writeln(text: string, style: string | null = null): this {
    return this.write(text + EOL.LF, style);
  }

  /**
   * @inheritDoc IOutput.newLine
   */
  public newLine(count = 1): this {
    return this.write(EOL.LF.repeat(count - 1));
  }

  /**
   * @inheritDoc IOutput.space
   */
  public space(count = 1): this {
    return this.write(" ".repeat(count));
  }

  /**
   * @inheritDoc IOutput.success
   */
  public success(
    text: string,
    style: string | null = null,
    figure = true,
  ): this {
    this.write(
      `${figure ? Figure.tick() + " " : ""}${text}`,
      `${style ? style + ";" : ""} color: green`,
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.error
   */
  public error(text: string, style: string | null = null, figure = true): this {
    this.write(
      `${figure ? Figure.cross() + " " : ""}${text}`,
      `${style ? style + ";" : ""} color: red`,
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.formattedError
   */
  public formattedError(title: string, message: string): this {
    this.newLine();
    this.error(title.toUpperCase(), null, false);
    this.newLine();
    this.write(`${Figure.cross()}`);
    this.error(" ERROR: ", null, false);
    this.writeln(`${message}`);

    return this;
  }

  /**
   * @inheritDoc IOutput.info
   */
  public info(text: string, style: string | null = null, figure = true): this {
    this.write(
      `${figure ? Figure.info() + " " : ""}${text}`,
      `${style ? style + ";" : ""} color: blue`,
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.warning
   */
  public warning(
    text: string,
    style: string | null = null,
    figure = true,
  ): this {
    this.write(
      `${figure ? Figure.warning() + " " : ""}${text}`,
      `${style ? style + ";" : ""} color: yellow`,
    );

    return this;
  }
}
