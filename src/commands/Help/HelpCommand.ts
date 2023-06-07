import { Command } from "../../Decorator/Command.ts";
import { request } from "../../Decorator/request.ts";
import { response } from "../../Decorator/response.ts";
import {
  Figure,
  get,
  ICollection,
  Output,
  Row,
  Style,
  Table,
} from "../../deps.ts";
import { Keys } from "../../Keys.ts";
import { Request } from "../../Request.ts";
import { Response } from "../../Response.ts";
import { CommandDefinitionType } from "../../types.ts";
import { printCommandHelp } from "./printCommandHelp.ts";

export class HelpCommand {
  @Command("help", [], {
    args: [
      {
        name: "command",
        description: "Command name",
      },
    ],
    description: "Display help",
    usage: ["ooneex help", "ooneex -h", "ooneex --help"],
    version: "1.0.0",
  })
  public index(
    @request request: Request,
    @response response: Response,
  ): Response {
    const arg = request.args[0];

    if (arg) {
      printCommandHelp(arg);
      return response;
    }

    const commands = get<ICollection<string, CommandDefinitionType>>(
      Keys.Commands,
    );

    const style = new Style();
    const output = new Output();

    const table = new Table();
    style.color("blue");

    table.header(
      Row.from([
        style.render("Name"),
        style.render("Description"),
        style.render("Usage"),
      ]).align("center"),
    );

    style.color("gray");

    for (const [name, def] of commands) {
      const usages = def.usage.map((usage) => {
        return `${Figure.arrowRight()} ${style.render(usage)}`;
      });

      table.push([
        name,
        def.description,
        usages.join("\n"),
      ]);
    }

    style.reset();
    output.newLine();
    table.align("left").border(true).render();

    return response;
  }
}
