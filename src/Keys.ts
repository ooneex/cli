export const Keys = {
  Env: {
    Default: Symbol.for(`env-default-${crypto.randomUUID()}`),
    Helper: Symbol.for(`env-helper-${crypto.randomUUID()}`),
  },
  Request: Symbol.for(`request-${crypto.randomUUID()}`),
  Response: Symbol.for(`response-${crypto.randomUUID()}`),
  Commands: Symbol.for(`commands-${crypto.randomUUID()}`),
  Internal: {
    // For parameter decorators
    Parameters: Symbol.for(`internal-parameters-${crypto.randomUUID()}`),
  },
};
