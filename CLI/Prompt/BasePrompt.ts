import {SuggestionHandler} from "../deps.ts";
import {BasePromptType} from "./types.ts";

export class BasePrompt {
  protected options: BasePromptType;

  constructor(message: string) {
    this.options = {message};
  }

  public message(message: string): this {
    this.options.message = message;

    return this;
  }

  public defaultValue(value?: string): this {
    this.options.default = value;

    return this;
  }

  public transform(callback?: (input: string) => string): this {
    this.options.transform = callback;

    return this;
  }

  public validate(callback?: (input: string) => string): this {
    this.options.validate = callback;

    return this;
  }

  public infoMessage(message?: string): this {
    this.options.hint = message;

    return this;
  }

  public pointerIcon(icon?: string): this {
    this.options.pointer = icon;

    return this;
  }

  public promptIndentation(indentation?: string): this {
    this.options.indent = indentation;

    return this;
  }

  public suggestions(suggestions?: (string | number)[] | SuggestionHandler): this {
    this.options.suggestions = suggestions;

    return this;
  }

  public showList(list?: boolean): this {
    this.options.list = list;

    return this;
  }

  public showUsageInformation(info?: boolean): this {
    this.options.info = info;

    return this;
  }

  public rows(row?: number): this {
    this.options.maxRows = row;

    return this;
  }

  public prefix(prefix?: string): this {
    this.options.prefix = prefix;

    return this;
  }
}
