import { File, IDirectory, IFile, sass } from "./deps.ts";

export class Sass {
  constructor(
    public readonly entry: IDirectory,
    public readonly output: IDirectory,
  ) {
  }

  // TODO: add options for sourceMap minify watch and output
  // https://sass-lang.com/documentation/js-api/interfaces/Options
  public compile(): void {
    const files = this.getFiles();
    files.map((file) => {
      const result = sass.compileString(file.read());
      const cssFileName = file.getPath().replace(/\.scss$/i, ".css");
      const cssFile = new File(cssFileName);
      cssFile.write(result.css);
    });
  }

  private getFiles(): IFile[] {
    let files = this.entry.files(/\.scss$/i) ?? [];

    const directories = this.entry.directories(null, true) ?? [];
    directories.map((directory) => {
      files = [...files, ...(directory.files(/\.scss$/i) ?? [])];
    });

    return files;
  }
}
