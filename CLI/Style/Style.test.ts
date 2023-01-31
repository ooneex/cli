import { assertEquals } from "@ooneex/testing/asserts.ts";
import { colors } from "./deps.ts";
import { Style } from "./mod.ts";

const style = new Style();

Deno.test("Style - should render modifiers", () => {
  assertEquals(colors.bold("hello"), style.bold().render("hello"));

  style.reset().strikethrough().hidden().inverse().underline().italic().dim()
    .bold();
  assertEquals(
    colors.bold(
      colors.dim(
        colors.italic(
          colors.underline(
            colors.inverse(colors.hidden(colors.strikethrough("hello"))),
          ),
        ),
      ),
    ),
    style.render("hello"),
  );
});

Deno.test("Style - should render normal color", () => {
  style.reset();
  assertEquals(colors.blue("hello"), style.color("blue").render("hello"));
});

Deno.test("Style - should render light color", () => {
  style.reset();
  assertEquals(
    colors.brightBlue("hello"),
    style.color("blue", true).render("hello"),
  );
});

Deno.test("Style - should render normal background color", () => {
  style.reset();
  assertEquals(colors.bgWhite("hello"), style.bgc("white").render("hello"));
});

Deno.test("Style - should render light background color", () => {
  style.reset();
  assertEquals(
    colors.bgBrightWhite("hello"),
    style.bgc("white", true).render("hello"),
  );
});

Deno.test("Style - should reset style", () => {
  assertEquals("hello", style.reset().render("hello"));
});
