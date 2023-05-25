import { ComponentChildren, EnvHelper, get, Keys } from "../deps.ts";

// @ts-ignore: trust me
export interface IHeaderProps extends HTMLAttributes<HTMLHeadElement> {
  charset?: string;
  favicon?: string;
  viewport?: string;
  description?: string;
  styles?: string[];
  children?: ComponentChildren;
  title: string;
}

export const Head = (
  props: IHeaderProps,
) => {
  const envHelper = get<EnvHelper>(Keys.Env.Helper);

  const {
    charset = envHelper.getCharset(),
    favicon,
    viewport = "width=device-width, initial-scale=1.0",
    title,
    children,
    styles,
    description,
  } = props;

  delete props.charset;
  delete props.favicon;
  delete props.viewport;
  delete props.children;
  delete props.styles;
  delete props.description;

  return (
    <head {...props}>
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
        styles.map((style) => <link rel={"stylesheet"} href={style} />)}

      <title>{title}</title>
      {children}
    </head>
  );
};
