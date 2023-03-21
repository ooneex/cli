import { ComponentChildren } from "https://esm.sh/preact@10.12.1";
import { Helper } from "../deps.ts";

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
      {scripts
        ? scripts.map((s) => {
          if (Helper.isString(s)) {
            s = { src: s };
          }
          return s.src ? <script {...s} src={s.src} /> : null;
        })
        : null}
    </body>
  );
};
