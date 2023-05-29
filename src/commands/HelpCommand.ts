import { Command } from "../Decorator/Command.ts";

export class HelpCommand {
  @Command("help", [], {
    description: "Display help",
    usage: ["ooneex help", "ooneex -h"],
    version: "1.0.0",
  })
  public index(): void {
    console.log("help command");
  }
}
