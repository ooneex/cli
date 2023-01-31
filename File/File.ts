import {
  Directory,
  extname,
  FS,
  Helper,
  IDirectory,
  Path,
  readLines,
} from "./deps.ts";
import { FileException } from "./FileException.ts";
import { FileCpConfigType, IFile } from "./types.ts";

/**
 * File
 * This class allows you to manage files.
 */
export class File implements IFile {
  public static EOL: string = FS.EOL.CRLF;

  constructor(private path: string) {
    this.path = Path.normalize(this.path);
  }

  /**
   * Gets normalized path of file.
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Gets name of file.
   */
  public getName(): string {
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
      FS.ensureFileSync(this.path);
    } catch (e) {
      throw new FileException(`[ensure] ${e.message}`);
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
      throw new FileException(`[empty] ${e.message}`);
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

      throw new FileException(`[exists] ${e.message}`);
    }
  }

  /**
   *  Writes string `content`, by default creating a new file if needed, else overwriting.
   */
  public write(content: string): this {
    try {
      Deno.writeTextFileSync(this.path, content, { create: true });

      return this;
    } catch (e) {
      throw new FileException(`[write] ${e.message}`);
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
      throw new FileException(`[write] ${e.message}`);
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
      throw new FileException(`[replaceText] ${e.message}`);
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
      throw new FileException(`[read] ${e.message}`);
    }
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
      FS.copySync(this.path, file.getPath(), config);

      return file;
    } catch (e) {
      throw new FileException(`[cp] ${e.message}`);
    }
  }

  /**
   * Move file to another directory. Overwrites it if option provided.
   */
  public mv(directory: string, overwrite = false): IFile {
    try {
      const file = new File(directory + "/" + this.getName());
      if (this.isEquals(file)) {
        return this;
      }

      file.getDirectory().ensure();
      FS.moveSync(this.path, file.getPath(), { overwrite });
      this.path = file.getPath();

      return this;
    } catch (e) {
      throw new FileException(`[mv] ${e.message}`);
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
      throw new FileException(`[rm] ${e.message}`);
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
      throw new FileException(`[rename] ${e.message}`);
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
      throw new FileException(`[chmod] ${e.message}`);
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
      throw new FileException(`[lines] ${e.message}`);
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
      throw new FileException(`[${info}] ${e.message}`);
    }
  }
}
