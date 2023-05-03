export type DotEnvValueType =
  | string
  | number
  | boolean
  | (string | number | boolean)[];

export type DotEnvType = Record<string, DotEnvValueType>;
