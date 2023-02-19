import {Confirm, ConfirmOptions} from "../deps.ts";
import {BasePrompt} from "./BasePrompt.ts";
import {InputPromptType} from "./types.ts";

export class ConfirmPrompt extends BasePrompt {
  protected options: InputPromptType;

  constructor(message: string) {
    super(message);
    this.options = {message};
  }

  public async prompt(): Promise<boolean> {
    return await Confirm.prompt(this.options as ConfirmOptions);
  }
}
