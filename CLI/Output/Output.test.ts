import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { assertSpyCalls, spy } from "@ooneex/testing/mock.ts";
import { figures } from "../Figure/deps.ts";
import { EOL, Style } from "./deps.ts";
import { Output } from "./mod.ts";

describe("Output", () => {
  const decoder = new TextDecoder();
  const style = new Style();

  Deno.stdout.writeSync = (p: Uint8Array): number => {
    return 5;
  };

  const output = new Output();
  const message = "Hello";
  const stdoutSpy = spy(Deno.stdout, "writeSync");

  it("write", () => {
    output.write(message);
    assertSpyCalls(stdoutSpy, 1);
    const arg = decoder.decode(stdoutSpy.calls[0].args[0]);
    assertEquals(arg, message);
  });

  it("write with style", () => {
    style.color("green");
    output.write(message, style);
    assertSpyCalls(stdoutSpy, 2);
    const arg = decoder.decode(stdoutSpy.calls[1].args[0]);
    assertEquals(arg, style.render(message));
  });

  it("write with new line", () => {
    output.writeln(message);
    assertSpyCalls(stdoutSpy, 3);
    const arg = decoder.decode(stdoutSpy.calls[2].args[0]);
    assertEquals(arg, message + EOL.LF);
  });

  it("write new line", () => {
    output.newLine(2);
    assertSpyCalls(stdoutSpy, 4);
    const arg = decoder.decode(stdoutSpy.calls[3].args[0]);
    assertEquals(arg, EOL.LF.repeat(2));
  });

  it("write space", () => {
    output.space(2);
    assertSpyCalls(stdoutSpy, 5);
    const arg = decoder.decode(stdoutSpy.calls[4].args[0]);
    assertEquals(arg, " ".repeat(2));
  });

  it("write success message", () => {
    output.success(message);
    assertSpyCalls(stdoutSpy, 6);
    let arg = decoder.decode(stdoutSpy.calls[5].args[0]);
    assertEquals(arg, style.render(figures.tick + " " + message));
    output.success(message, false);
    arg = decoder.decode(stdoutSpy.calls[6].args[0]);
    assertEquals(arg, style.render(message));
  });

  it("write error message", () => {
    style.color("red");
    output.error(message);
    assertSpyCalls(stdoutSpy, 8);
    let arg = decoder.decode(stdoutSpy.calls[7].args[0]);
    assertEquals(arg, style.render(figures.cross + " " + message));
    output.error(message, false);
    arg = decoder.decode(stdoutSpy.calls[8].args[0]);
    assertEquals(arg, style.render(message));
  });

  it("write info message", () => {
    style.color("blue");
    output.info(message);
    assertSpyCalls(stdoutSpy, 10);
    let arg = decoder.decode(stdoutSpy.calls[9].args[0]);
    assertEquals(arg, style.render(figures.info + " " + message));
    output.info(message, false);
    arg = decoder.decode(stdoutSpy.calls[10].args[0]);
    assertEquals(arg, style.render(message));
  });

  it("write warning message", () => {
    style.color("yellow");
    output.warning(message);
    assertSpyCalls(stdoutSpy, 12);
    let arg = decoder.decode(stdoutSpy.calls[11].args[0]);
    assertEquals(arg, style.render(figures.warning + " " + message));
    output.warning(message, false);
    arg = decoder.decode(stdoutSpy.calls[12].args[0]);
    assertEquals(arg, style.render(message));
  });
});
