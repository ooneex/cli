import { EOL, Figure, IStyle, Style } from "./deps.ts";
import { IOutput } from "./mod.ts";

/**
 * Output
 * This class allows you to print text on terminal.
 *
 * @example
 *
 * ```ts
 *  const output = new Output();
 *  const style = new Style();
 *
 *  // Simple text
 *  output.write('Hello');
 *
 *  // Text with style
 *  style.bold().color('yellow');
 *  output.write('Hello', style);
 *
 *  // Success message with tick
 *  output.success('Hello');
 *
 *  // Success message without tick
 *  output.success('Hello', false);
 * ```
 */
export class Output implements IOutput {
  private style = new Style();
  private consoleFigure = new Figure();

  /**
   * @inheritDoc IOutput.write
   */
  public write(text: string, style?: IStyle): this {
    const encoder = new TextEncoder();
    Deno.stdout.writeSync(
      encoder.encode(style ? style.render(text) : text),
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.writeln
   */
  public writeln(text: string, style?: IStyle): this {
    return this.write(text + EOL.LF, style);
  }

  /**
   * @inheritDoc IOutput.newLine
   */
  public newLine(count = 1): this {
    return this.write(EOL.LF.repeat(count));
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
  public success(text: string, figure = true): this {
    this.style.reset().color("green");
    this.write(
      this.style.render(
        (figure ? this.consoleFigure.tick() + " " : "") + text,
      ),
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.error
   */
  public error(text: string, figure = true): this {
    this.style.reset().color("red");
    this.write(
      this.style.render(
        (figure ? this.consoleFigure.cross() + " " : "") + text,
      ),
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.formattedError
   */
  public formattedError(title: string, message: string): this {
    this.newLine();
    this.error(title.toUpperCase(), false);
    this.newLine();
    this.write(`${this.consoleFigure.cross()}`);
    this.error(" ERROR: ", false);
    this.writeln(`${message}`);
    return this;
  }

  /**
   * @inheritDoc IOutput.info
   */
  public info(text: string, figure = true): this {
    this.style.reset().color("blue");
    this.write(
      this.style.render(
        (figure ? this.consoleFigure.info() + " " : "") + text,
      ),
    );

    return this;
  }

  /**
   * @inheritDoc IOutput.warning
   */
  public warning(text: string, figure = true): this {
    this.style.reset().color("yellow");
    this.write(
      this.style.render(
        (figure ? this.consoleFigure.warning() + " " : "") + text,
      ),
    );

    return this;
  }
}
