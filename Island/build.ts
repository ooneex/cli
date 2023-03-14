import { build } from "npm:vite@^4.0.0";
import solid from "npm:vite-plugin-solid@^2.4.0";

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
