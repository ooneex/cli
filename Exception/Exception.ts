import { container, Keys } from "./deps.ts";
import { IException, StackType } from "./types.ts";

export class Exception extends Error implements IException {
  public readonly name: string;
  public readonly stacks: StackType[];
  public readonly file: string | null;
  public readonly line: number | null;
  public readonly column: number | null;

  // deno-lint-ignore constructor-super
  constructor(
    message: string | Error,
    public readonly status: number | null = null,
    private readonly data: Readonly<unknown> | null = null,
  ) {
    if (message instanceof Error) {
      super((message as Error).message);
      this.name = message.constructor.name;
      this.stacks = this.parseStack(message.stack as string);
    } else {
      super(message as string);
      this.name = this.constructor.name;
      this.stacks = this.parseStack(this.stack as string);
    }

    this.file = this.stacks.length > 0 ? this.stacks[0].file : null;
    this.line = this.stacks.length > 0 ? this.stacks[0].line : null;
    this.column = this.stacks.length > 0 ? this.stacks[0].column : null;
  }

  public getData<T>(): T | null {
    return this.data as (T | null);
  }

  public current(): this | null {
    if (!container.isBound(Keys.Exception)) {
      return null;
    }

    return container.get(Keys.Exception);
  }

  private parseStack(stack: string): StackType[] {
    const errorStack: StackType[] = [];
    const stacks = stack.split(/[\n\r]/) ?? [];

    stacks.map((stack) => {
      const match = stack.trim().match(/at (.+:(\d+):(\d+)\)?)/i);
      if (match) {
        const file = match[1].replace(`file://${Deno.cwd()}/`, "");
        errorStack.push({
          file: file.replace(`:${match[2]}:${match[3]}`, ""),
          line: parseInt(match[2]),
          column: parseInt(match[3]),
        });
      }
    });

    return errorStack;
  }
}
