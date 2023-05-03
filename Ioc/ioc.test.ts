import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { container, get, registerConstant } from "./mod.ts";

describe("Ioc", () => {
  const Keys = {
    One: Symbol.for(crypto.randomUUID()),
    Two: Symbol.for(crypto.randomUUID()),
  };

  it("register value", () => {
    registerConstant(Keys.One, "One");

    assertEquals(container.isBound(Keys.One), true);
  });

  it("get value", () => {
    assertEquals(get<string>(Keys.One), "One");
  });
});
