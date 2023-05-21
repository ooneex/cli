import { z } from "./deps.ts";
import { AppEnvSchema } from "./schema.ts";

export type AppEnvType = z.infer<typeof AppEnvSchema>;
