import { File, get, Keys } from "./deps.ts";
import { IslandPropsType, LocalConfigType } from "./types.ts";

export const Island = (props: IslandPropsType) => {
  const config = get<LocalConfigType>(Keys.Config.App);

  const cacheFile = new File(
    `${config.directories.var}/cache/islands/${props.config.name}/${props.config.id}.json`,
  );

  if (!cacheFile.exists()) {
    cacheFile.writeJson({});
  }

  if (props.data) {
    const data = cacheFile.json();
    // @ts-ignore: trust me
    data[props.data.key] = props.data.value;
    cacheFile.writeJson(data);
  }

  return (
    <div
      data-ooneex-island-id={props.config.id}
      data-ooneex-island={`${props.config.name}__${props.config.id}`}
    >
      {props.children}
    </div>
  );
};
