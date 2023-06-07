import { parseVersion, z } from "./deps.ts";

export const ArgSchema = z.object({
  name: z.string(),
  description: z.string(),
  required: z.boolean().optional(),
  constraint: z.instanceof(RegExp).optional(),
});
export const ActionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const ShortFlagSchema = z.object({
  name: z.string().regex(/^[a-z]$/i),
  description: z.string(),
  required: z.boolean().optional(),
  constraint: z.instanceof(RegExp).optional(),
});

export const LongFlagSchema = z.object({
  name: z.string().regex(/^[a-z][a-z0-9_-]+$/i),
  description: z.string(),
  required: z.boolean().optional(),
  constraint: z.instanceof(RegExp).optional(),
});

export const VersionSchema = z.custom<string>(
  (value: unknown): boolean => {
    const v = parseVersion(value as string);

    return v !== null;
  },
);

export const CommandDefinitionSchema = z.object({
  name: z.string().regex(/^[a-z][a-z0-9_-]*[a-z0-9]*$/i),
  actions: ActionSchema.array(),
  args: ArgSchema.array().optional(),
  shortFlags: ShortFlagSchema.array().optional(),
  longFlags: LongFlagSchema.array().optional(),
  description: z.string(),
  version: VersionSchema,
  usage: z.string().array(),
  run: z.function(),
});
