import { CharsetSchema, LocaleSchema, VersionSchema, z } from "./deps.ts";

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
  CHARSET: CharsetSchema,
  TLS_KEY: z.string().optional(),
  TLS_CERT: z.string().optional(),
});

export const ViewConfigSchema = z.object({
  directories: z.object({
    components: z.string(),
    config: z.string(),
    controllers: z.string(),
    islands: z.string(),
    middlewares: z.string(),
    public: z.string(),
    var: z.string(),
    views: z.string(),
  }),
});

export const ApiConfigSchema = z.object({
  directories: z.object({
    config: z.string(),
    controllers: z.string(),
    middlewares: z.string(),
    var: z.string(),
  }),
});
