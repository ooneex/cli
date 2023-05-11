import { get, getOrNull, HttpRequest, Keys } from "../../deps.ts";

export const route = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  parameters[parameterIndex] = () => {
    const request: HttpRequest | null = parameters[0] as HttpRequest;

    if (!(request instanceof HttpRequest)) {
      return null;
    }

    const K = get<{ Route: { Default: symbol } }>(request.id);

    return getOrNull(K.Route.Default);
  };
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
