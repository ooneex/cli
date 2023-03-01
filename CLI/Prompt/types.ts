import { SelectValueOptions, SuggestionHandler } from "../deps.ts";

export type InputPromptType = BasePromptType & {
  minLength?: number;
  maxLength?: number;
  // complete?: CompleteHandler;
  /**
   * With the listPointer you specify the list pointer icon. Default is ❯.
   */
  // listPointer?: string;
};

export type ListPromptType = BasePromptType & {
  separator?: string;
  minLength?: number;
  maxLength?: number;
  minTags?: number;
  maxTags?: number;
};

export type SelectPromptType = Omit<BasePromptType, "default"> & {
  options: SelectValueOptions;
  search?: boolean;
  searchLabel?: string;
  minOptions?: number;
  maxOptions?: number;
  check?: string;
  uncheck?: string;
};

export type NumberPromptType = BasePromptType & {
  min?: number;
  max?: number;
  float?: boolean;
  round?: number;
};

export type BasePromptType = {
  message: string;
  default?: string | boolean;
  transform?: (input: string) => string;
  /**
   * With the validate callback option you can validate the user input. It receives as first argument the sanitized user input.
   *
   * If true is returned, the value is valid.
   * If false is returned, an error message is shown.
   * If a string is returned, the value will be used as error message.
   */
  validate?: (input: string) => boolean | string;
  /**
   * With the hint option you can display an info message that is displayed below the prompt.
   */
  hint?: string;
  /**
   * The pointer option lets you change the pointer icon.
   */
  pointer?: string;
  /**
   * With the indent option you can change the prompt indentation. Default is " ".
   */
  indent?: string;
  /**
   * The suggestions options specifies a list of default suggestions.
   */
  suggestions?: (string | number)[] | SuggestionHandler;
  list?: boolean;
  /**
   * The info option enables the info bar which displays some usage information.
   */
  info?: boolean;
  /**
   * With the maxRows option you specify the number of suggestions displayed per page. Defaults to 10.
   */
  maxRows?: number;
  prefix?: string;
};

export type SelectOptionType = {
  name: string;
  value: string;
  disabled?: boolean;
};
