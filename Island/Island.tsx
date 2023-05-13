import { File, get, Helper, HttpStatusType, Keys } from "./deps.ts";
import { getIslandId } from "./getIslandId.ts";
import { IslandNotFoundException } from "./IslandNotFoundException.ts";
import { IIslandProps } from "./types.ts";

export const Island = (props: IIslandProps) => {
  const name = Helper.trim(props.name, "/").replace(/\.tsx/i, "");

  const config = get<{ directories: { islands: string } }>(Keys.Config.App);

  const file = new File(`${config.directories.islands}/${name}.tsx`);
  if (!file.exists()) {
    throw new IslandNotFoundException(`Cannot found island ${name}.tsx`);
  }

  const id = getIslandId(name);

  if (!id) {
    return null;
  }

  const data = props.data ?? {};

  return (
    <div data-ooneex-island-id={id} data-ooneex-island-name={name}>
      {props.children}
    </div>
  );
};
