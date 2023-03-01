import { File, Helper, Path, render } from "./deps.ts";
import { IView, ViewType } from "./types.ts";
import { ViewNotFoundException } from "./ViewNotFoundException.ts";

export class View implements IView {
  public async render(
    view: ViewType,
    data: Record<string, unknown> = {},
  ): Promise<string> {
    view = Path.normalize(Helper.trim(view, "/")) as ViewType;

    const viewPath = `${Deno.cwd()}/${view}.tsx`;

    const file = new File(viewPath);
    if (!file.exists()) {
      throw new ViewNotFoundException(`View "${view}" not found`);
    }

    const Component = (await import(viewPath)).default;

    return render(<Component {...data} />);
  }
}

export const view = new View();
