import {
  Collection,
  DotEnvValueType,
  File,
  ICollection,
  parseEnv as parse,
} from "./deps.ts";

export const parseEnv = (): ICollection<string, DotEnvValueType> => {
  const data = new Collection<string, DotEnvValueType>();

  let file = new File(".env");
  if (file.exists()) {
    data.setData(parse(file.read()));
  }

  file = new File(".env.local");
  if (file.exists()) {
    data.setData(parse(file.read()));
  }

  if (data.isEmpty()) {
    data.setData({
      APP_ENV: "local",
      LOCALE: "en-us",
      COUNTRY: "United States",
      VERSION: "1.0.0",
      SECRET: crypto.randomUUID(),
      DEBUG: true,
      PORT: "3000",
      HOST: "localhost",
    });
  }

  if (!data.has("APP_ENV")) {
    data.set("APP_ENV", "local");
  }

  if (!data.has("LOCALE")) {
    data.set("LOCALE", "en-us");
  }

  if (!data.has("DEBUG")) {
    data.set("DEBUG", true);
  }

  if (!data.has("PORT")) {
    data.set("PORT", "3000");
  }

  if (!data.has("HOST")) {
    data.set("HOST", "localhost");
  }

  return data;
};
