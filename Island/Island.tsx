import { Helper } from "./deps.ts";
import { getIslandId } from "./getIslandId.ts";
import { IIslandProps } from "./types.ts";

export const Island = (props: IIslandProps) => {
  const name = Helper.trim(props.name, "/");
  const id = getIslandId(name);

  if (!id) {
    return null;
  }

  const data = props.data ?? {};

  return <div data-ooneex-island-id={id} data-ooneex-island-name={name} />;
};
