import { ComponentChildren } from "preact";
import { asset } from "./asset.ts";

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
  { charset, favicon, viewport, title, children, styles, description }:
    IHeaderProps,
) => {
  return (
    <head>
      <meta charSet={charset ?? "UTF-8"} />

      {favicon
        ? (
          <link
            rel={"icon"}
            type={"image/svg+xml"}
            href={asset(favicon)}
          />
        )
        : null}

      <meta
        name={"viewport"}
        content={viewport ?? "width=device-width, initial-scale=1.0"}
      />

      {description ? <meta name={"description"} content={description} /> : null}

      {styles
        ? styles.map((style) => <link rel={"stylesheet"} href={asset(style)} />)
        : null}

      <title>{title}</title>
      ---ooneex-island-mark-64d2e8dc---
      {children}
    </head>
  );
};
