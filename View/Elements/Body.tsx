import { ComponentChildren, Helper } from "../deps.ts";

//@ts-ignore: trust me
export interface IBodyProps extends HTMLAttributes<HTMLBodyElement> {
  children?: ComponentChildren;
  //@ts-ignore: trust me
  scripts?: HTMLAttributes<HTMLScriptElement>[] | string[];
}

export const Body = (
  props: IBodyProps,
) => {
  const { children, scripts } = props;

  delete props.children;
  delete props.scripts;

  return (
    <body {...props}>
      {children}
      <span
        style={{ display: "none" }}
        className={"ooneex-island-scripts-e10a91b1-a672-4ff1-9d72-1150f3becaa0"}
      />
      {scripts &&
        scripts.forEach((s) => {
          if (Helper.isString(s)) {
            s = { src: s };
          }
          return s.src && <script {...s} src={s.src} />;
        })}
    </body>
  );
};
