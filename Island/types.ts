import { Component } from "./deps.ts";

export type ViteOptionsType = Record<string, unknown> & {
  mode: "development" | "production";
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

export interface IIslandProps {
  name: string;
  key?: string;
  data?: Record<string, unknown>;
  children?: Component;
}

export type ManifestType = {
  assets?: string[];
  css?: string[];
  file: string;
  imports?: string[];
  isEntry?: boolean;
  src?: string;
};
