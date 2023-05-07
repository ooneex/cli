import { get, Helper, Keys } from "./deps.ts";
export const publicDir = "public";

export const asset = (name: string): string => {
  const config = get<{ directories: { public: string } }>(Keys.Config.App);

  name = Helper.trim(name, "/ ");

  return `${config.directories.public}/${name}`;
};
