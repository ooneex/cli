import { Helper } from "./deps.ts";
export const assetPublicDir = "/public";

export const asset = (name: string): string => {
  return `${assetPublicDir}/${Helper.trim(name, "/")}`;
};
