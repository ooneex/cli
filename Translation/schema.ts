import { z } from "./deps.ts";
import { LOCALES } from "./Locales.ts";

export const LocaleSchema = z.enum(LOCALES);
