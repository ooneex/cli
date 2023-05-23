import {
  copySync,
  Directory,
  ensureFileSync,
  EOL,
  extname,
  Helper,
  IDirectory,
  moveSync,
  Path,
  readLines,
} from "./deps.ts";
import { AddFileContentException } from "./Exception/AddFileContentException.ts";
import { ChmodFileException } from "./Exception/ChmodFileException.ts";
import { CopyFileException } from "./Exception/CopyFileException.ts";
import { EmptyFileException } from "./Exception/EmptyFileException.ts";
import { EnsureFileException } from "./Exception/EnsureFileException.ts";
import { ExistsFileException } from "./Exception/ExistsFileException.ts";
import { GetFileInfoException } from "./Exception/GetFileInfoException.ts";
import { MoveFileException } from "./Exception/MoveFileException.ts";
import { ReadFileException } from "./Exception/ReadFileException.ts";
import { ReadFileLinesException } from "./Exception/ReadFileLinesException.ts";
import { ReadJsonFileException } from "./Exception/ReadJsonFileException.ts";
import { RemoveFileException } from "./Exception/RemoveFileException.ts";
import { RenameFileException } from "./Exception/RenameFileException.ts";
import { ReplaceFileTextException } from "./Exception/ReplaceFileTextException.ts";
import { StreamFileException } from "./Exception/StreamFileException.ts";
import { WriteFileException } from "./Exception/WriteFileException.ts";
import { WriteJsonFileException } from "./Exception/WriteJsonFileException.ts";
import { FileCpConfigType, IFile } from "./types.ts";

/**
 * File
 * This class allows you to manage files.
 */
export class File implements IFile {
  public static EOL: string = EOL.CRLF;

  constructor(
    private path: string,
    public readonly tag: string | null = null,
  ) {
    this.path = Path.normalize(this.path);
  }

  /**
   * Gets normalized path of file.
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Gets file name without extension.
   */
  public getName(): string {
    const name = Path.basename(this.path);
    const ext = this.getExt();
    return name.replace(new RegExp(`\.${ext}$`), "");
  }

  /**
   * Gets file name with extension.
   */
  public getFullName(): string {
    return Path.basename(this.path);
  }

  /**
   * Gets directory of the file.
   */
  public getDirectory(): IDirectory {
    return new Directory(Path.dirname(this.path));
  }

  /**
   * Gets extension of the file.
   */
  public getExt(): string {
    return Helper.trim(extname(this.path), "\\.");
  }

  /**
   * Ensures that the file exists.
   * If the file that is requested to be created is in directories that do not exist, these directories are created.
   * If the file already exists, it is NOT MODIFIED.
   */
  public ensure(): this | false {
    try {
      ensureFileSync(this.path);
    } catch (e) {
      throw new EnsureFileException(e.message);
    }

    return this;
  }

  /**
   * Ensures that a file is empty.
   */
  public empty(): this {
    try {
      Deno.truncateSync(this.path);
    } catch (e) {
      throw new EmptyFileException(e.message);
    }

    return this;
  }

  /**
   * Checks if the file exists.
   */
  public exists(): boolean {
    return File.exists(this.path);
  }

  /**
   * Checks if the file exists.
   */
  public static exists(path: string): boolean {
    try {
      const fileInfo = Deno.lstatSync(path);

      return fileInfo.isFile;
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return false;
      }

      throw new ExistsFileException(e.message);
    }
  }

  /**
   *  Writes string `content`, by default creating a new file if needed, else overwriting.
   */
  public write(content: string): this {
    try {
      this.ensure();
      Deno.writeTextFileSync(this.path, content, { create: true });

      return this;
    } catch (e) {
      throw new WriteFileException(e.message);
    }
  }

  /**
   *  Writes json content, by default creating a new file if needed, else overwriting.
   */
  public writeJson(data: Record<string, unknown>): this {
    try {
      this.ensure();
      this.write(JSON.stringify(data));

      return this;
    } catch (e) {
      throw new WriteJsonFileException(e.message);
    }
  }

  /**
   *  Appends `content` to the file.
   */
  public addContent(content: string, line = false): this {
    try {
      Deno.writeTextFileSync(this.path, content + (line ? File.EOL : ""), {
        append: true,
      });

      return this;
    } catch (e) {
      throw new AddFileContentException(e.message);
    }
  }

  /**
   *  Replaces content into file.
   */
  public replaceText(search: RegExp, newText: string): this {
    try {
      let content = this.read();
      content = content.replace(search, newText);
      this.write(content);

      return this;
    } catch (e) {
      throw new ReplaceFileTextException(e.message);
    }
  }

  /**
   * Reads and returns the entire contents of a file.
   */
  public read(): string {
    try {
      const decoder = new TextDecoder("utf-8");
      const data = Deno.readFileSync(this.path);

      return decoder.decode(data);
    } catch (e) {
      throw new ReadFileException(e.message);
    }
  }

  public async stream(): Promise<ReadableStream<Uint8Array>> {
    try {
      const file = await Deno.open(this.path, { read: true });

      return file.readable;
    } catch (e) {
      throw new StreamFileException(e.message);
    }
  }

  /**
   * Ensures that a file is empty.
   */
  public json<T = string>(): Record<string | number, T> {
    let data = {};

    try {
      data = JSON.parse(this.read());
    } catch (e) {
      throw new ReadJsonFileException(e.message);
    }

    return data;
  }

  /**
   * Copies a file. Overwrites it if option provided.
   */
  public cp(
    destination: string,
    config: FileCpConfigType = { overwrite: false },
  ): IFile {
    try {
      const file = new File(destination);
      copySync(this.path, file.getPath(), config);

      return file;
    } catch (e) {
      throw new CopyFileException(e.message);
    }
  }

  /**
   * Move file to another directory. Overwrites it if option provided.
   */
  public mv(directory: string, overwrite = false): IFile {
    try {
      const file = new File(directory + "/" + this.getFullName());
      if (this.isEquals(file)) {
        return this;
      }

      file.getDirectory().ensure();
      moveSync(this.path, file.getPath(), { overwrite });
      this.path = file.getPath();

      return this;
    } catch (e) {
      throw new MoveFileException(e.message);
    }
  }

  /**
   * Removes file.
   */
  public rm(): this {
    try {
      Deno.removeSync(this.path);

      return this;
    } catch (e) {
      throw new RemoveFileException(e.message);
    }
  }

  /**
   * Renames file.
   */
  public rename(filename: string): this {
    try {
      const path = Path.normalize(
        this.getDirectory().getPath() + "/" + filename,
      );
      Deno.renameSync(this.path, path);
      this.path = path;

      return this;
    } catch (e) {
      throw new RenameFileException(e.message);
    }
  }

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
  public chmod(mode: number): this {
    try {
      Deno.chmodSync(this.path, mode);

      return this;
    } catch (e) {
      throw new ChmodFileException(e.message);
    }
  }

  /**
   * Gets file lines.
   */
  public async lines(
    filter?: RegExp,
  ): Promise<string[]> {
    const lines: string[] = [];

    try {
      const fileReader = await Deno.open(this.path);

      for await (const line of readLines(fileReader)) {
        if (!filter || (filter && filter.test(line))) {
          lines.push(line);
        }
      }

      return lines;
    } catch (e) {
      throw new ReadFileLinesException(e.message);
    }
  }

  /**
   * Checks if two files are equal.
   */
  public isEquals(file: IFile): boolean {
    return Path.resolve(this.getPath()) === Path.resolve(file.getPath());
  }

  /**
   * Gets size of the file, in bytes.
   */
  public getSize(): number {
    return File.getInfo(this.path, "size") as number;
  }

  /**
   * Gets last modification time of the file.
   */
  public updatedAt(): Date | null {
    return File.getInfo(this.path, "mtime") as (Date | null);
  }

  /**
   * Gets last access time of the file.
   */
  public accessAt(): Date | null {
    return File.getInfo(this.path, "atime") as (Date | null);
  }

  /**
   * Gets creation time of the file.
   */
  public createdAt(): Date | null {
    return File.getInfo(this.path, "birthtime") as (Date | null);
  }

  /**
   * Gets group ID of the owner of the file.
   */
  public getGid(): number | null {
    return File.getInfo(this.path, "gid") as (number | null);
  }

  /**
   * Gets permissions for the file.
   *
   * **UNSTABLE**
   */
  public getMode(): number | null {
    return File.getInfo(this.path, "mode") as (number | null);
  }

  /**
   * Gets user ID of the owner of the file.
   */
  public getUid(): number | null {
    return File.getInfo(this.path, "uid") as (number | null);
  }

  public static getInfo(
    path: string,
    info: "size" | "mtime" | "atime" | "birthtime" | "gid" | "mode" | "uid",
  ): number | Date | null {
    try {
      const fileInfo = Deno.lstatSync(path);

      return fileInfo[info];
    } catch (e) {
      throw new GetFileInfoException(e.message);
    }
  }
}
