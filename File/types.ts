import { IDirectory } from "../Directory/types.ts";

export interface IFile {
  /**
   * Gets normalized path of file.
   */
  getPath(): string;
  /**
   * Gets name of file.
   */
  getName(): string;
  /**
   * Gets directory of the file.
   */
  getDirectory(): IDirectory;
  /**
   * Gets extension of the file.
   */
  getExt(): string;
  /**
   * Ensures that the file exists.
   * If the file that is requested to be created is in directories that do not exist, these directories are created.
   * If the file already exists, it is NOT MODIFIED.
   */
  ensure(): this | false;
  /**
   * Ensures that a file is empty.
   */
  empty(): this;
  /**
   * Checks if the file exists.
   */
  exists(): boolean;
  /**
   *  Writes string `content`, by default creating a new file if needed, else overwriting.
   */
  write(content: string): this;
  /**
   *  Appends `content` to the file.
   */
  addContent(content: string, lien: boolean): this;
  /**
   *  Replaces content into file.
   */
  replaceText(search: RegExp, newText: string): this;
  /**
   *  Writes string `content`, by default creating a new file if needed, else overwriting.
   */
  read(): string;
  /**
   * Copies a file. Overwrites it if option provided.
   */
  cp(destination: string, config: FileCpConfigType): IFile;
  /**
   * Move file to another directory. Overwrites it if option provided.
   */
  mv(directory: string, overwrite: boolean): IFile;
  /**
   * Removes file.
   */
  rm(): this;
  /**
   * Renames file.
   */
  rename(filename: string): this;
  /**
   * Gets file lines.
   */
  lines(filter?: RegExp): Promise<string[]>;
  /**
   * Changes the permission.
   * Ignores the process's umask.
   *
   * ```ts
   * const file = new File("/path/to/file.txt");
   * file.chmod(0o666);
   * ```
   *
   * | Number | Description |
   * | ------ | ----------- |
   * | 7      | read, write, and execute |
   * | 6      | read and write |
   * | 5      | read and execute |
   * | 4      | read only |
   * | 3      | write and execute |
   * | 2      | write only |
   * | 1      | execute only |
   * | 0      | no permission |
   */
  chmod(mode: number): this;
  /**
   * Checks if two files are equal.
   */
  isEquals(file: IFile): boolean;
  /**
   * Gets size of the file, in bytes.
   */
  getSize(): number;
  /**
   * Gets last modification time of the file.
   */
  updatedAt(): Date | null;
  /**
   * Gets last access time of the file.
   */
  accessAt(): Date | null;
  /**
   * Gets creation time of the file.
   */
  createdAt(): Date | null;
  /**
   * Gets permissions for the file.
   *
   * **UNSTABLE**
   */
  getMode(): number | null;
  /**
   * Gets user ID of the owner of the file.
   */
  getUid(): number | null;
  /**
   * Gets group ID of the owner of this file.
   */
  getGid(): number | null;
}

export type FileCpConfigType = {
  /**
   * Overwrite existing directory. Default is `false`
   */
  overwrite?: boolean;
  /**
   * When `true`, will set last modification and access times to the ones of the
   * original source files.
   * When `false`, timestamp behavior is OS-dependent.
   * Default is `false`.
   */
  preserveTimestamps?: boolean;
};
