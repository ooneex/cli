import { Command } from "../../Decorator/Command.ts";
import { request } from "../../Decorator/request.ts";
import { response } from "../../Decorator/response.ts";
import { Request } from "../../Request.ts";
import { Response } from "../../Response.ts";
import { createComponent } from "./createComponent.ts";

export class MakeCommand {
  @Command("make", [
    { name: "component", description: "Create component" },
    { name: "controller", description: "Create controller" },
    { name: "island", description: "Create island" },
    { name: "view", description: "Create view" },
  ], {
    description: "Create Ooneex resources",
    usage: [
      "ooneex make:component",
      "ooneex make:controller",
      "ooneex make:island",
      "ooneex make:view",
    ],
    version: "1.0.0",
  })
  public index(
    @request request: Request,
    @response response: Response,
  ): Response {
    switch (request.action) {
      case "component":
        createComponent();
        break;
      default:
        console.log("default");
    }

    return response;
  }
}
