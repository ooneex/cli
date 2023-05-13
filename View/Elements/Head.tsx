import { ComponentChildren } from "../deps.ts";

export interface IHeaderProps {
  charset?: string;
  favicon?: string;
  viewport?: string;
  description?: string;
  styles?: string[];
  children?: ComponentChildren;
  title: string;
}

export const Head = (
  {
    charset = "UTF-8",
    favicon,
    viewport = "width=device-width, initial-scale=1.0",
    title,
    children,
    styles,
    description,
  }: IHeaderProps,
) => {
  return (
    <head>
      {charset && <meta charSet={charset} />}

      {favicon &&
        (
          <link
            rel={"icon"}
            type={"image/svg+xml"}
            href={favicon}
          />
        )}

      {viewport && <meta name={"viewport"} content={viewport} />}

      {description && <meta name={"description"} content={description} />}

      <meta
        name={"description"}
        content={"ooneex-island-styles-fb26a3d7-6e80-4cda-a797-3c0163a517fc"}
      />

      {styles &&
        styles.forEach((style) => <link rel={"stylesheet"} href={style} />)}

      <title>{title}</title>
      {children}
    </head>
  );
};
