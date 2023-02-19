import {Toggle, ToggleOptions} from "../deps.ts";
import {BasePrompt} from "./BasePrompt.ts";
import {InputPromptType} from "./types.ts";

export class TogglePrompt extends BasePrompt {
  protected options: InputPromptType;

  constructor(message: string) {
    super(message);
    this.options = {message};
  }

  public async prompt(): Promise<boolean> {
    return await Toggle.prompt(this.options as ToggleOptions);
  }
}
