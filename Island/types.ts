export type ViteOptionsType = {
  appType: "custom";
  clearScreen: true;
  logLevel: "silent";
  build: {
    outDir: "static";
    assetsDir: "dist";
    sourcemap: boolean;
    minify: boolean;
    manifest: boolean;
    write: true;
    rollupOptions: {
      input: string[];
      output: {
        entryFileNames: string;
      };
    };
    watch?: {
      clearScreen: boolean;
    };
  };
  plugins: unknown[];
};

export type IslandManifestType = Record<string, {
  file: string;
  isEntry?: boolean;
  src: string;
}>;
