import {
  Plugin,
  PluginRenderResult,
  PluginRenderScripts,
  PluginRenderStyleTag,
} from "$fresh/server.ts";
import { PluginRenderContext } from "$fresh/src/server/types.ts";

export const OoneexFreshPlugin = (): Plugin => {
  return {
    name: "ooneex-fresh-plugin",
    render: (ctx: PluginRenderContext): PluginRenderResult => {
      const scripts: PluginRenderScripts[] = [];
      const styles: PluginRenderStyleTag[] = [];

      // const res = ctx.render();

      // console.log(res);

      return {
        scripts,
        styles,
      };
    },
  };
};
