import {Number, NumberOptions} from "../deps.ts";
import {BasePrompt} from "./BasePrompt.ts";
import {NumberPromptType} from "./types.ts";

export class NumberPrompt extends BasePrompt {
  protected options: NumberPromptType;

  constructor(message: string) {
    super(message);
    this.options = {message};
  }

  public min(min?: number): this {
    this.options.min = min;

    return this;
  }

  public max(max?: number): this {
    this.options.max = max;

    return this;
  }

  public float(float?: boolean): this {
    this.options.float = float;

    return this;
  }

  public round(round?: number): this {
    this.options.round = round;

    return this;
  }

  public async prompt(): Promise<number> {
    return await Number.prompt(this.options as NumberOptions);
  }
}
