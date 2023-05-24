import {
  HttpMethodSchema,
  HttpProtocolSchema,
} from "../../Module/Http/schema.ts";
import { AppEnvSchema, LocaleSchema, VersionSchema, z } from "../deps.ts";

export const RouteConstraintsSchema = z.object({
  where: z.record(z.string(), z.string().or(z.number())).optional(),
  regex: z.record(z.string(), z.instanceof(RegExp)).optional(),
  number: z.string().array().optional(),
  alphaNumeric: z.custom<string>((value) => {
    return /^[a-z0-9]+$/.test(value as string);
  }).array().optional(),
  in: z.record(z.string(), z.string().or(z.number()).array()).optional(),
});

export const RouteDefinitionSchema = z.object({
  name: z.string(),
  path: z.custom<string>(
    (value) => {
      if ((value as string) === "/") {
        return true;
      }

      if (!/^[a-z0-9\/:_-]+$/.test(value as string)) {
        return false;
      }

      return true;
    },
    `Format not valid. Try "/path-name/:param-1/:param-2"`,
  ),
  controller: z.function(),
  methods: HttpMethodSchema.array().optional(),
  protocols: HttpProtocolSchema.array().optional(),
  hosts: z.string().array().optional(),
  ips: z.string().ip({ message: "Invalid IP address" }).array().optional(),
  ports: z.number().positive().array().optional(),
  constraints: RouteConstraintsSchema.optional(),
  default: z.record(z.string().or(z.number()), z.string().or(z.number()))
    .optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  locales: LocaleSchema.array().optional(),
  envs: AppEnvSchema.array().optional(),
  versions: VersionSchema.array().optional(),
  description: z.string().optional(),
});
