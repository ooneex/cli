import { CODE_ISO2 } from "./CodeIso2.ts";
import { CODE_ISO3 } from "./CodeIso3.ts";
import { CONTINENTS } from "./Continents.ts";
import { COUNTRIES } from "./Countries.ts";
import { CURRENCIES } from "./Currencies.ts";
import { PHONE_CODES } from "./PhoneCodes.ts";
import { CountryByLocaleType, LocaleType } from "./types.ts";

export class CountryHelper {
  public static getByLocale(locale: LocaleType): CountryByLocaleType {
    const countries: CountryByLocaleType = {};

    CODE_ISO2.map((iso) => {
      const spec = COUNTRIES[iso];
      if (spec) {
        countries[iso] = {
          continent: CONTINENTS[iso],
          currency: CURRENCIES[iso],
          iso2: iso,
          iso3: CODE_ISO3[iso],
          name: spec[locale],
          phoneCode: PHONE_CODES[iso],
        };
      }
    });

    return countries;
  }
}
