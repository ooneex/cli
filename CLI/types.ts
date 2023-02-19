import {Container} from "./Container.ts";
import { IEnv } from "./deps.ts";
import {Figure} from "./Figure/Figure.ts";
import { Output } from "./Output/Output.ts";
import { Style } from "./Style/Style.ts";

export interface ICommand {
  getName: () => string;
  getActions: () => ActionType[];
  getArgs: () => ArgType[];
  getShortFlags: () => ShortFlagType[];
  getLongFlags: () => LongFlagType[];
  getDescription: () => string;
  getVersion: () => CommandVersionType;
  getUsage: () => string[];
  run: <T = void>(app: CommandType) => T;
}

export type CommandType = {
  env: IEnv;
  action: string;
  args: string[];
  shortFlags: Record<ShortFlagKeyType, string[]>;
  longFlags: Record<string, string[]>;
  output: Output;
  style: Style;
  figure: Figure;
  container: Container;
};

export type CommandRequestType = {
  name: string;
  action: string;
  args: string[];
  shortFlags: Record<ShortFlagKeyType, string[]>;
  longFlags: Record<string, string[]>;
};

export type ActionType = {
  name: string;
  description: string;
};

export type ArgType = {
  name: string;
  description: string;
  required?: boolean;
  constraint?: RegExp;
};

export type CommandVersionType = `${number}.${number}.${number}`;
export type ShortFlagType = Omit<ArgType, "name"> & {name: ShortFlagKeyType};
export type LongFlagType = ArgType;
export type ShortFlagKeyType =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
