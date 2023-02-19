import { File, render } from "./deps.ts";
import { IView, ViewType } from "./types.ts";
import { ViewNotFoundException } from "./ViewNotFoundException.ts";

export class View implements IView {
  public async render(
    view: ViewType,
    data: Record<string, unknown> = {},
  ): Promise<string> {
    const file = new File(view);
    if (!file.exists()) {
      throw new ViewNotFoundException(`View "${view}" not found`);
    }

    const Component = (await import(view)).default;

    return render(<Component {...data} />);
  }
}

export const view = new View();
