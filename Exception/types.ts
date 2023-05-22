export interface IException {
  readonly name: string;
  readonly message: string;
  readonly stacks: StackType[];
  readonly file: string | null;
  readonly line: number | null;
  readonly column: number | null;
  readonly status: number | null;
  readonly date: Date;
  getData: <T>() => T | null;
}

export type StackType = {
  file: string;
  line: number;
  column: number;
};
