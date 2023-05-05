export const Keys = {
  Config: {
    App: Symbol.for(`config-app-${crypto.randomUUID()}`),
  },
  Env: {
    Default: Symbol.for(`env-default-${crypto.randomUUID()}`),
    Helper: Symbol.for(`env-helper-${crypto.randomUUID()}`),
  },
  Router: Symbol.for(`router-${crypto.randomUUID()}`),
  Routes: Symbol.for(`routes-${crypto.randomUUID()}`),
  Route: {
    Default: Symbol.for(`routes-${crypto.randomUUID()}`),
    Params: Symbol.for(`routes-${crypto.randomUUID()}`),
  },
  Response: Symbol.for(`response-${crypto.randomUUID()}`),
  Request: Symbol.for(`request-${crypto.randomUUID()}`),
  Exception: Symbol.for(`exception-${crypto.randomUUID()}`),
  Controller: {
    Default: Symbol.for(`controller-default-${crypto.randomUUID()}`),
    NotFound: Symbol.for(`controller-notFound-${crypto.randomUUID()}`),
    ServerError: Symbol.for(`controller-serverError-${crypto.randomUUID()}`),
  },
  AbortController: Symbol.for(`abortController${crypto.randomUUID()}`),

  Internal: {
    // For parameter decorators
    Parameters: Symbol.for(`internal-parameters-${crypto.randomUUID()}`),
  },
};

// deno-lint-ignore no-explicit-any
export type Newable<T> = new (...args: any[]) => T;

export interface Abstract<T> {
  prototype: T;
}

export type ServiceIdentifierType<T = unknown> =
  | string
  | symbol
  | Newable<T>
  | Abstract<T>;
