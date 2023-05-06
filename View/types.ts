export type renderViewType = (
  view: ViewType,
  data: Record<string, unknown>,
) => Promise<string>;

export type ViewType = `${string}View`;
