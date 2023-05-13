import { ComponentChildren, Helper } from "../deps.ts";

export interface IBodyProps {
  children?: ComponentChildren;
  //@ts-ignore:
  scripts?: HTMLAttributes<HTMLScriptElement>[] | string[];
}

export const Body = (
  { children, scripts }: IBodyProps,
) => {
  return (
    <body>
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
