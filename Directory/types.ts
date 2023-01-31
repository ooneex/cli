import { IFile } from "./deps.ts";

export interface IDirectory {
  /**
   * Gets normalized path of directory.
   */
  getPath(): string;
  /**
   * Gets name of directory.
   */
  getName(): string;
  /**
   * Gets directory of the directory.
   */
  getDirectory(): IDirectory;
  /**
   * Ensures that the directory exists.
   * If the directory structure does not exist, it is created (`mkdir -p`).
   */
  ensure(): this | false;
  /**
   * Ensures that a directory is empty. Deletes directory contents if the directory is not empty.
   * If the directory does not exist, it is created. The directory itself is not deleted.
   */
  empty(): this;
  /**
   * Checks if the directory exists.
   */
  exists(): boolean;
  /**
   * Creates directory.
   */
  mkdir(dir: string, recursive: boolean, mode: number): this;
  /**
   * Changes directory.
   */
  cd(dir: string): this;
  /**
   * Copies a directory. Overwrites it if option provided.
   */
  cp(destination: string, config: CpConfigType): IDirectory;
  /**
   * Move to another directory. Overwrites it if option provided.
   */
  mv(directory: string, overwrite: boolean): IDirectory;
  /**
   * Removes files or directories.
   */
  rm(paths?: string[], recursive?: boolean): this;
  /**
   * Renames directory.
   */
  rename(name: string): this;
  /**
   * Changes the permission.
   * Ignores the process's umask.
   *
   * ```ts
   * const directory = new Directory("/path/to/file");
   * directory.chmod(0o666);
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
   * Creates file.
   */
  touch(filename: string, content: string): IFile;
  /**
   * Lists directories.
   */
  directories(filters: RegExp | null, recursive: boolean): IDirectory[];
  /**
   * Lists files.
   */
  files(filters?: RegExp): IFile[];
  /**
   * Checks if two directories are equal.
   */
  isEquals(directory: IDirectory): boolean;
  /**
   * Gets size of the file, in bytes.
   */
  getSize(): number;
  /**
   * Gets last modification time of the directory.
   */
  updatedAt(): Date | null;
  /**
   * Gets last access time of the directory.
   */
  accessAt(): Date | null;
  /**
   * Gets creation time of the directory.
   */
  createdAt(): Date | null;
  /**
   * Gets permissions for the directory.
   *
   * **UNSTABLE**
   */
  getMode(): number | null;
  /**
   * Gets user ID of the owner of the directory.
   */
  getUid(): number | null;
  /**
   * Gets group ID of the owner of this file.
   */
  getGid(): number | null;
}

export type CpConfigType = {
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
