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
      LOCALE: "en",
      COUNTRY: "United States",
      VERSION: "1.0.0",
      SECRET: crypto.randomUUID(),
      DEBUG: true,
      PORT: "3000",
      HOST: "localhost",
      CHARSET: "utf-8",
    });
  }

  return data;
};
