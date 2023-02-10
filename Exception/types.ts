export interface IException {
  getName: () => string;
  getMessage: () => string;
  getStack: () => StackType[];
  getFile: () => string;
  getLine: () => number;
  getColumn: () => number;
  getData: <T>() => T | null;
  getFormatter: <T, V>() => ((data: T) => V) | null;
}

export type StackType = {
  file: string;
  line: number;
  column: number;
};
