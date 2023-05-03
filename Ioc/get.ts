import { container } from "./Container.ts";
import { ContainerException } from "./ContainerException.ts";
import { ServiceIdentifierType } from "./types.ts";

export const get = <T>(key: ServiceIdentifierType<T>): T => {
  if (!container.isBound(key)) {
    throw new ContainerException(`Cannot find value with key "${String(key)}"`);
  }

  return container.get<T>(key);
};

export const getOrNull = <T>(key: ServiceIdentifierType<T>): T | null => {
  if (!container.isBound(key)) {
    return null;
  }

  return container.get<T>(key);
};
