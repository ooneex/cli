import { DOMParser } from "deno-dom";
import { assert } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { renderToString } from "../deps.ts";
import { Body } from "../mod.ts";

describe("Body", () => {
  const content = renderToString(<Body />);
  const body = (new DOMParser()).parseFromString(content, "text/html");

  it("body element", () => {
    assert(body);
  });
});
