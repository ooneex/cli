import config from "../../ooneex.json" assert { type: "json" };
import { Command } from "../Decorator/Command.ts";
import { response } from "../Decorator/response.ts";
import { Response } from "../Response.ts";

export class VersionCommand {
  @Command("version", [], {
    description: "Display Ooneex CLI version",
    usage: ["ooneex version", "ooneex -v"],
    version: "1.0.0",
  })
  public index(@response response: Response): Response {
    console.log(`Ooneex CLI: ${config.version}`);

    console.log(`%cdeno: ${config.deno.version}`, "color: grey");
    console.log(`%cv8: ${config.v8.version}`, "color: grey");
    console.log(`%ctypescript: ${config.typescript.version}`, "color: grey");

    return response;
  }
}
