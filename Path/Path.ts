import {
  basename,
  delimiter,
  dirname,
  isAbsolute,
  join,
  normalize,
  relative,
  resolve,
  sep,
} from "./deps.ts";

export class Path {
  /**
   * Directory separator
   */
  public static DS: string = sep;
  /**
   * Directory separator
   */
  public static SEPARATOR: string = sep;
  public static DELIMITER: string = delimiter;

  /**
   * Verifies whether provided path is absolute.
   */
  public static isAbsolute(path: string): boolean {
    return isAbsolute(path);
  }

  /**
   * Verifies whether provided path is relative.
   */
  public static isRelative(path: string): boolean {
    return !isAbsolute(path);
  }

  /**
   * Join all given a sequence of paths,then normalizes the resulting path.
   */
  public static join(...paths: string[]): string {
    return join(...paths);
  }

  /**
   * Normalize the path, resolving '..' and '.' segments.
   */
  public static normalize(path: string): string {
    path = path.replace(/[\\/]/g, Path.SEPARATOR);

    return normalize(path);
  }

  /**
   * Return the relative path from `from` to `to` based on current working directory.
   */
  public static relative(from: string, to: string): string {
    return relative(from, to);
  }

  /**
   * Resolves `pathSegments` into an absolute path.
   */
  public static resolve(...paths: string[]): string {
    return resolve(...paths);
  }
  /**
   * Return the last portion of a `path`. Trailing directory separators are ignored.
   */
  public static basename(path: string): string {
    return basename(path);
  }

  /**
   * Return the last portion of a `path`. Trailing directory separators are ignored.
   */
  public static dirname(path: string): string {
    return dirname(path);
  }
}
