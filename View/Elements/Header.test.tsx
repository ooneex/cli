import { assert, assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { DOMParser } from "deno-dom";
import { renderToString } from "../deps.ts";
import { Header } from "../mod.ts";

describe("View", () => {
  const content = renderToString(<Header title={"Fake title"} />);
  const head = (new DOMParser()).parseFromString(content, "text/html");

  it("head element", () => {
    assert(head);
  });

  it("title", () => {
    const title = head?.querySelector("title");
    assertEquals(title?.innerHTML, "Fake title");
  });

  it("default meta", () => {
    const meta = head?.querySelector("meta[charset=UTF-8]");
    assert(meta);
  });

  it("viewport meta", () => {
    const metaViewport = head?.querySelector("meta[name=viewport]");
    assert(metaViewport);
    assertEquals(
      metaViewport?.getAttribute("content"),
      "width=device-width, initial-scale=1.0",
    );
  });
});
