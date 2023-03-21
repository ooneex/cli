import { assert } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { render as renderToString } from "npm:preact-render-to-string";
import {DOMParser} from "deno-dom";

import {Body} from "./Body.tsx";

describe("Body", () => {
  const content = renderToString(<Body />);
  const body = (new DOMParser()).parseFromString(content, "text/html");

  it("body element", () => {
    assert(body);
  });
});
