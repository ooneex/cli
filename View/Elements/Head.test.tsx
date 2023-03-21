import { assert, assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { render as renderToString } from "npm:preact-render-to-string";
import {DOMParser} from "deno-dom";

import {Head} from "./Head.tsx";

describe("View", () => {
  const content = renderToString(<Head title={"Fake title"} />);
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
    assertEquals(metaViewport?.getAttribute("content"), "width=device-width, initial-scale=1.0");
  });

  it("island mark", () => {
    assert(content.match("#-ooneex-island-mark-64d2e8dc-#"));
  });
});
