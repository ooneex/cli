import { LocaleSchema, z } from "./deps.ts";

// TODO: Use https://deno.land/std@0.188.0/semver/mod.ts
export const VersionSchema = z.custom<`${number}.${number}.${number}`>(
  (value: unknown): boolean => {
    return /^\d+\.\d+\.\d+$/.test(value as string);
  },
);

export const AppEnvSchema = z.enum([
  "development",
  "local",
  "production",
  "staging",
  "testing",
]);

export const SecretSchema = z.custom<string>(
  (value: unknown): boolean => {
    return /^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/.test(
      value as string,
    );
  },
);

export const EnvSchema = z.object({
  APP_ENV: AppEnvSchema,
  LOCALE: LocaleSchema,
  COUNTRY: z.string(),
  VERSION: VersionSchema,
  SECRET: SecretSchema,
  DEBUG: z.boolean(),
  PORT: z.number().positive(),
  HOST: z.string(),
});

export const ViewConfigSchema = z.object({
  directories: z.object({
    components: z.string(),
    config: z.string(),
    controllers: z.string(),
    islands: z.string(),
    middlewares: z.string(),
    public: z.string(),
    root: z.string(),
    var: z.string(),
    views: z.string(),
  }),
});

export const ApiConfigSchema = z.object({
  directories: z.object({
    config: z.string(),
    controllers: z.string(),
    middlewares: z.string(),
    root: z.string(),
    var: z.string(),
  }),
});
