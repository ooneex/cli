import { z } from "./deps.ts";
import { AppEnvSchema } from "./schema.ts";

export type AppType = "view" | "api";
export type AppEnvType = z.infer<typeof AppEnvSchema>;
