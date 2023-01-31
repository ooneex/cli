import { DotEnv } from "./DotEnv.ts";
export type DotEnvValueType = string | number | boolean;

export interface IDotEnv {
  parse(path: string): void;
  fromJson(data: Record<string, DotEnvValueType>): DotEnv;
}
