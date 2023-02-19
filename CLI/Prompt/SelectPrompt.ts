import { Checkbox, CheckboxOptions, Select } from "../deps.ts";
import { BasePrompt } from "./BasePrompt.ts";
import { SelectOptionType, SelectPromptType } from "./types.ts";

export class SelectPrompt extends BasePrompt {
  protected options: SelectPromptType;
  private multiple = false;

  constructor(message: string) {
    super(message);
    this.options = { message, options: [] };
  }

  public addOption(option: SelectOptionType): this {
    this.options.options.push(option);

    return this;
  }

  public addSeparator(sep: string): this {
    this.options.options.push(Select.separator(sep));

    return this;
  }

  public searchLabel(label?: string): this {
    this.options.searchLabel = label;
    this.isSearch(true);

    return this;
  }

  public checkIcon(icon?: string): this {
    this.options.check = icon;

    return this;
  }

  public uncheckIcon(icon?: string): this {
    this.options.check = icon;

    return this;
  }

  public isSearch(search?: boolean): this {
    this.options.search = search;

    return this;
  }

  public min(min?: number): this {
    this.options.minOptions = min;

    return this;
  }

  public max(max?: number): this {
    this.options.maxOptions = max;

    return this;
  }

  public isMultiple(multiple: boolean): this {
    this.multiple = multiple;

    return this;
  }

  public async prompt(): Promise<string | string[]> {
    return this.multiple
      ? await Checkbox.prompt(this.options as CheckboxOptions)
      : await Select.prompt(this.options);
  }
}
