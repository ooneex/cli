import { z } from "./deps.ts";
import { AppEnvSchema, VersionSchema } from "./schema.ts";

export type VersionType = z.infer<typeof VersionSchema>;
export type EnvType = z.infer<typeof AppEnvSchema>;
