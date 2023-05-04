import { assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { loadControllers } from "./mod.ts";

describe("Controller", () => {
  it("loadController", async () => {
    try {
      await loadControllers();
    } catch (e) {
      assertInstanceOf(e, Error);
    }
  });
});
