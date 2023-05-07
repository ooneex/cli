import { JSX } from "./deps.ts";

export type renderViewType = <T = unknown>(
  view: ViewType<T>,
  data?: T,
) => string;

export type ViewType<T = unknown> = (props: T) => JSX.Element;
