import { get, getOrNull, Keys, Request } from "../deps.ts";

export const exception = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) ||
    [];

  parameters[parameterIndex] = () => {
    const request: Request | null = parameters[0] as Request;

    if (!(request instanceof Request)) {
      return null;
    }

    const K = get<{ Exception: symbol }>(request.id);

    return getOrNull(K.Exception);
  };

  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
