import { JSX } from "./deps.ts";

export type ViteOptionsModeType = "development" | "production";

export type ViteOptionsType = Record<string, unknown> & {
  mode: ViteOptionsModeType;
  build: Record<string, unknown> & {
    sourcemap: boolean;
    minify: boolean;
    css: {
      devSourcemap: boolean;
    };
    watch: null | Record<string, unknown>;
  };
};

export type LocalConfigType = {
  directories: {
    islands: string;
    public: string;
    var: string;
  };
};

export type IslandConfigType = { id: string; name: string; updatedAt: number };

export type IslandPropsType = {
  config: IslandConfigType;
  data?: {
    key: string | number;
    value: Record<string, unknown>;
  };
  children?: JSX.Element;
};

export type ManifestType = {
  assets?: string[];
  css?: string[];
  file: string;
  imports?: string[];
  isEntry?: boolean;
  src?: string;
};
