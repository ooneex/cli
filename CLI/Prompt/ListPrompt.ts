import { List, ListOptions } from "../deps.ts";
import { BasePrompt } from "./BasePrompt.ts";
import { ListPromptType } from "./types.ts";

export class ListPrompt extends BasePrompt {
  protected options: ListPromptType;

  constructor(message: string) {
    super(message);
    this.options = { message };
  }

  public min(length?: number): this {
    this.options.minLength = length;

    return this;
  }

  public max(length?: number): this {
    this.options.maxLength = length;

    return this;
  }

  public minTags(min?: number): this {
    this.options.minTags = min;

    return this;
  }

  public maxTags(max?: number): this {
    this.options.maxTags = max;

    return this;
  }

  public separator(separator?: string): this {
    this.options.separator = separator;

    return this;
  }

  public async prompt(): Promise<string[]> {
    return await List.prompt(this.options as ListOptions);
  }
}
