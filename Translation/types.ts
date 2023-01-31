import { CODE_ISO2 } from "./CodeIso2.ts";
import { LOCALES } from "./Locales.ts";

export type LocaleType = typeof LOCALES[number];
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
