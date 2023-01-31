import { File, FS, IFile, Path } from "./deps.ts";
import { DirectoryException } from "./DirectoryException.ts";
import { CpConfigType, IDirectory } from "./types.ts";

/**
 * This class allows you to manage directories.
 *
 * @example
 *
 * ```ts
 *  const directory = new Directory("/path/to/file");
 *  directory.getPath(); // /path/to/file
 *  directory.getName(); // file
 *  directory.ensure();
 *  directory.exists(); // true
 *  directory.cd("..");
 * ```
 */
export class Directory implements IDirectory {
  /**
   * Normalized path.
   */
  private path: string;

  constructor(path: string) {
    this.path = Path.normalize(path);
  }

  /**
   * Gets normalized path of directory.
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Gets name of directory.
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
   * Ensures that the directory exists.
   * If the directory structure does not exist, it is created (`mkdir -p`).
   */
  public ensure(): this | false {
    try {
      FS.ensureDirSync(this.path);
    } catch {
      return false;
    }

    return this;
  }

  /**
   * Ensures that a directory is empty. Deletes directory contents if the directory is not empty.
   * If the directory does not exist, it is created. The directory itself is not deleted.
   */
  public empty(): this {
    try {
      FS.emptyDirSync(this.path);
    } catch (e) {
      throw new DirectoryException(`[empty] ${e.message}`);
    }

    return this;
  }

  /**
   * Checks if the directory exists.
   */
  public exists(): boolean {
    return Directory.exists(this.path);
  }

  /**
   * Checks if the directory exists.
   */
  public static exists(path: string): boolean {
    try {
      const fileInfo = Deno.lstatSync(path);

      return fileInfo.isDirectory;
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return false;
      }

      throw new DirectoryException(`[exists] ${e.message}`);
    }
  }

  /**
   * Creates directory.
   *
   * @param dir Directory to create.
   * @param recursive Set true to create directories recursively (like mkdir -p).
   * @param mode Permissions to use when creating the directory.
   *
   * @return The directory instance.
   */
  public mkdir(
    dir: string,
    recursive = true,
    mode = 0o777,
  ): this {
    try {
      const path = Path.normalize(this.path + "/" + dir);
      Deno.mkdirSync(path, { recursive, mode });

      return this;
    } catch (e) {
      throw new DirectoryException(`[mkdir] ${e.message}`);
    }
  }

  /**
   * Changes directory.
   */
  public cd(dir: string): this {
    const path = Path.normalize(this.path + "/" + dir);

    if (!Directory.exists(path)) {
      throw new DirectoryException("[cd] No such directory: " + dir);
    }

    this.path = path;

    return this;
  }

  /**
   * Copies a directory. Overwrites it if option provided.
   */
  public cp(
    destination: string,
    config: CpConfigType = { overwrite: false },
  ): IDirectory {
    try {
      const directory = new Directory(destination);
      FS.copySync(this.path, directory.getPath(), config);

      return directory;
    } catch (e) {
      throw new DirectoryException(`[cp] ${e.message}`);
    }
  }

  /**
   * Move to another directory. Overwrites it if option provided.
   */
  public mv(directory: string, overwrite = false): IDirectory {
    try {
      const dir = new Directory(directory);
      if (this.isEquals(dir)) {
        return this;
      }

      FS.moveSync(this.path, dir.getPath(), { overwrite });

      return dir;
    } catch (e) {
      throw new DirectoryException(`[mv] ${e.message}`);
    }
  }

  /**
   * Removes files or directories.
   */
  public rm(paths?: string[], recursive = true): this {
    try {
      if (paths) {
        paths.map((path) => {
          Deno.removeSync(`${Path.normalize(this.path + "/" + path)}`);
        });
      } else {
        Deno.removeSync(this.path, { recursive });
      }

      return this;
    } catch (e) {
      throw new DirectoryException(`[rm] ${e.message}`);
    }
  }

  /**
   * Renames directory.
   */
  public rename(name: string): this {
    try {
      const path = Path.normalize(this.path + "/../" + name);
      Deno.renameSync(this.path, path);
      this.path = path;

      return this;
    } catch (e) {
      throw new DirectoryException(`[rename] ${e.message}`);
    }
  }

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
  public chmod(mode: number): this {
    try {
      Deno.chmodSync(this.path, mode);

      return this;
    } catch (e) {
      throw new DirectoryException(`[chmod] ${e.message}`);
    }
  }

  /**
   * Creates file.
   */
  public touch(filename: string, content: string): IFile {
    const file = new File(this.path + "/" + filename);
    file.write(content);

    return file;
  }

  /**
   * Lists directories.
   */
  public static directories(
    dir: string,
    filters: RegExp | null = null,
    recursive = false,
  ): IDirectory[] {
    let directories: IDirectory[] = [];
    try {
      for (const entry of Deno.readDirSync(dir)) {
        const entryPath = Path.normalize(dir + "/" + entry.name);

        if (entry.isDirectory) {
          if (!filters || (filters.test(entry.name))) {
            directories.push(new Directory(entryPath));
          }
        }

        if (entry.isDirectory && recursive) {
          const nestedDirectories = Directory.directories(
            entryPath,
            filters,
            recursive,
          );

          if (nestedDirectories) {
            directories = [...directories, ...nestedDirectories];
          }
        }
      }

      return directories;
    } catch (e) {
      throw new DirectoryException(`[directories] ${e.message}`);
    }
  }

  /**
   * Lists directories.
   */
  public directories(
    filters: RegExp | null = null,
    recursive = false,
  ): IDirectory[] {
    return Directory.directories(this.path, filters, recursive);
  }

  /**
   * Lists files.
   */
  public files(
    filters?: RegExp,
  ): IFile[] {
    const files: IFile[] = [];

    try {
      for (const entry of Deno.readDirSync(this.path)) {
        if (entry.isFile) {
          if (!filters || (filters.test(entry.name))) {
            files.push(new File(this.path + "/" + entry.name));
          }
        }
      }

      return files;
    } catch (e) {
      throw new DirectoryException(`[files] ${e.message}`);
    }
  }

  /**
   * Checks if two directories are equal.
   */
  public isEquals(directory: IDirectory): boolean {
    return Path.resolve(this.getPath()) === Path.resolve(directory.getPath());
  }

  /**
   * Gets size of the directory, in bytes.
   */
  public getSize(): number {
    return File.getInfo(this.path, "size") as number;
  }

  /**
   * Gets last modification time of the directory.
   */
  public updatedAt(): Date | null {
    return File.getInfo(this.path, "mtime") as (Date | null);
  }

  /**
   * Gets last access time of the directory.
   */
  public accessAt(): Date | null {
    return File.getInfo(this.path, "atime") as (Date | null);
  }

  /**
   * Gets creation time of the directory.
   */
  public createdAt(): Date | null {
    return File.getInfo(this.path, "birthtime") as (Date | null);
  }

  /**
   * Gets group ID of the owner of the directory.
   */
  public getGid(): number | null {
    return File.getInfo(this.path, "gid") as (number | null);
  }

  /**
   * Gets permissions for the directory.
   *
   * **UNSTABLE**
   */
  public getMode(): number | null {
    return File.getInfo(this.path, "mode") as (number | null);
  }

  /**
   * Gets user ID of the owner of the directory.
   */
  public getUid(): number | null {
    return File.getInfo(this.path, "uid") as (number | null);
  }
}
