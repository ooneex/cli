/**
 * Output interface
 * This interface allows you to print some messages in the terminal.
 */
export interface IOutput {
  /**
   * Write text.
   */
  write(text: string, style: string | null): this;

  /**
   * Write with new line.
   */
  writeln(text: string, style: string | null): this;

  /**
   * Write new line.
   */
  newLine(count?: number): this;

  /**
   * Write space.
   */
  space(count?: number): this;

  /**
   * Write success message.
   */
  success(text: string, style: string | null, figure?: boolean): this;

  /**
   * Write error message.
   */
  error(text: string, style: string | null, figure?: boolean): this;

  /**
   * Write error message.
   */
  formattedError(title: string, message: string): this;

  /**
   * Write info message.
   */
  info(text: string, style: string | null, figure?: boolean): this;

  /**
   * Write warning message.
   */
  warning(text: string, style: string | null, figure?: boolean): this;
}
