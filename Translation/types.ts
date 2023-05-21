import { CODE_ISO2 } from "./CodeIso2.ts";
import { z } from "./deps.ts";
import { LocaleSchema } from "./schema.ts";

export type LocaleType = z.infer<typeof LocaleSchema>;
export type CodeIso2Type = typeof CODE_ISO2[number];

export type CountryType = {
  [iso in CodeIso2Type]?: { [locale in LocaleType]: string };
};

export type CountrySpecType = {
  iso2: CodeIso2Type;
  iso3: string;
  name: string;
  continent: string;
  currency: string | null;
  phoneCode: string | null;
};

export type CountryByLocaleType = {
  [iso in CodeIso2Type]?: CountrySpecType;
};
