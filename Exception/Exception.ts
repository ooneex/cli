import { Output } from "./deps.ts";
import { IException, StackType } from "./types.ts";

export class Exception extends Error implements IException {
  private errorStack: StackType[] = [];
  private data: unknown | null = null;
  private nativeError: Error | null = null;
  private formatter: ((data: unknown) => unknown) | null = null;

  public getName(): string {
    return this.constructor.name;
  }

  public getMessage(): string {
    return this.nativeError?.message ?? this.message;
  }

  public getStack(): StackType[] {
    if (this.errorStack.length === 0) {
      this.errorStack = this.parseStack(this.stack as string);
    }

    return this.errorStack;
  }

  public getFile(): string {
    const stacks = this.getStack();

    return stacks[0].file;
  }

  public getLine(): number {
    const stacks = this.getStack();

    return stacks[0].line;
  }

  public getColumn(): number {
    const stacks = this.getStack();

    return stacks[0].column;
  }

  public setData(data: unknown | null): this {
    this.data = data;

    return this;
  }

  public getData<T>(): T | null {
    return this.data as T;
  }

  public setFormatter(formatter: ((data: unknown) => unknown) | null): this {
    this.formatter = formatter;

    return this;
  }

  public getFormatter<T, V>(): ((data: T) => V) | null {
    return this.formatter as (((data: T) => V) | null);
  }

  public fromNativeError(error: Error): this {
    this.nativeError = error;

    this.errorStack = this.parseStack(error.stack as string);

    return this;
  }

  public static print(error: IException, stack = true): void {
    const output = new Output();

    output.printException(error, stack);
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
