import { build } from "vite";
import solid from "vite-plugin-solid";

await build(
  {
    appType: "custom",
    clearScreen: true,
    logLevel: "silent",
    build: {
      outDir: "static",
      assetsDir: "dist",
      sourcemap: false,
      minify: false,
      manifest: true,
      write: true,
      rollupOptions: {
        input: ["islands/ShowUsers.tsx"],
        output: {
          entryFileNames: `dist/[name]-[hash:10].js`,
        },
      },
      // watch: {
      // clearScreen: true
      // }
    },
    plugins: [solid({
      solid: {
        hydratable: true,
      },
    })],
  },
);
