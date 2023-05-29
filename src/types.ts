import { Collection, IException, z } from "../deps.ts";
import { Response } from "./Response.ts";
import {
  ActionSchema,
  ArgSchema,
  CommandDefinitionSchema,
  LongFlagSchema,
  ShortFlagSchema,
  VersionSchema,
} from "./schema.ts";

export interface IRequest {
  readonly name: string;
  readonly action: string;
  readonly args: string[];
  readonly shortFlags: Record<ShortFlagKeyType, string[]>;
  readonly longFlags: Record<string, string[]>;
}

export type CommandRequestType = {
  name: string;
  action: string;
  args: string[];
  shortFlags: Record<ShortFlagKeyType, string[]>;
  longFlags: Record<string, string[]>;
};

export interface IResponse {
  getStatus: () => number;
  getException: () => IException | null;
  readonly data: Collection<string | number, unknown>;
}

export type CommandDefinitionType = {
  name: z.infer<typeof CommandDefinitionSchema.shape.name>;
  actions: ActionType[];
  args?: ArgType[];
  shortFlags?: ShortFlagType[];
  longFlags?: LongFlagType[];
  description: z.infer<typeof CommandDefinitionSchema.shape.description>;
  version: VersionType;
  usage: z.infer<typeof CommandDefinitionSchema.shape.usage>;
  run: () => Response;
};

export type ActionType = z.infer<typeof ActionSchema>;

export type ArgType = z.infer<typeof ArgSchema>;

export type VersionType = z.infer<typeof VersionSchema>;
export type ShortFlagType = z.infer<typeof ShortFlagSchema>;
export type LongFlagType = z.infer<typeof LongFlagSchema>;

export type ParameterDecoratorReturnType = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => void;

export type MethodDecoratorReturnType = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyName: string,
  // deno-lint-ignore no-explicit-any
  descriptor: TypedPropertyDescriptor<any>,
) => void;

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
