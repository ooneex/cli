export type ParameterDecoratorReturnType = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => void;

export type MethodDecoratorReturnType = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyName: string,
  // deno-lint-ignore no-explicit-any
  descriptor: TypedPropertyDescriptor<any>,
) => void;
