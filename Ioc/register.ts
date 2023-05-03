import { container } from "./Container.ts";
import { ContainerException } from "./ContainerException.ts";
import { ServiceIdentifierType } from "./types.ts";

export const registerConstant = <T>(
  key: ServiceIdentifierType<T>,
  value: T,
  force = true,
): void => {
  if (force && container.isBound(key)) {
    container.unbind(key);
  }

  if (container.isBound(key)) {
    throw new ContainerException(
      `Cannot register value. Key "${String(key)}" already exists`,
    );
  }

  container.bind<T>(key).toConstantValue(value);
};
