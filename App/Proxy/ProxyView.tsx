import { ComponentType, PageProps } from "../deps.ts";
import { AppStateType } from "../types.ts";

type ProxyViewPropsType = {
  app: AppStateType;
  component: ComponentType;
  props: Record<string, unknown>;
};

export const ProxyView = ({ data }: PageProps<ProxyViewPropsType>) => {
  const Component = data.component;

  // @ts-ignore: trust me
  return <Component app={data.app} data={data.props} />;
};
