import { build, emptyDir } from "dnt";

const outDir = `.ooneex`;
const version = "1.0.0";
await emptyDir(outDir);

await build({
  entryPoints: [`mod.ts`],
  outDir: outDir,
  packageManager: "pnpm",
  shims: {
    deno: true,
  },
  compilerOptions: {
    "lib": [
      "dom",
      "dom.iterable",
    ],
  },
  package: {
    name: "ooneex",
    version: version,
    description: "Ooneex client modules and components",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/Ooneex/packages",
    },
    bugs: {
      url: "https://github.com/Ooneex/packages/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("README.md", `${outDir}/README.md`);
