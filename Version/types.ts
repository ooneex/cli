import { Options, z } from "./deps.ts";
import { VersionSchema } from "./schema.ts";

export type OptionsType = Options;

export type VersionType = z.infer<typeof VersionSchema>;
