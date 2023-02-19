import {Input} from "../deps.ts";
import {BasePrompt} from "./BasePrompt.ts";
import {InputPromptType} from "./types.ts";

export class InputPrompt extends BasePrompt {
  protected options: InputPromptType;

  constructor(message: string) {
    super(message);
    this.options = {message};
  }

  public min(length?: number): this {
    this.options.minLength = length;

    return this;
  }

  // public pointerIcon(icon?: string): this {
  //   this.options.listPointer = icon;
  //
  //   return this;
  // }

  public max(length?: number): this {
    this.options.maxLength = length;

    return this;
  }

  public async prompt(): Promise<string> {
    return await Input.prompt(this.options);
  }
}
