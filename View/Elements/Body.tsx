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
      {/*__island__scripts__*/}
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
