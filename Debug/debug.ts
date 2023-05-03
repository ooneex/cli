// deno-lint-ignore no-explicit-any
export const debug = (...data: any[]): void => {
  console.debug(...data);
  console.trace();
};
