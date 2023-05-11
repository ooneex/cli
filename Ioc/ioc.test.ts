import { assertEquals, assertInstanceOf } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { getOrNull } from "./get.ts";
import { container, ContainerException, get, registerConstant } from "./mod.ts";

describe("Ioc", () => {
  const Keys = {
    One: Symbol.for(crypto.randomUUID()),
    Two: Symbol.for(crypto.randomUUID()),
  };

  it("check exception", () => {
    try {
      get("no key");
    } catch (e) {
      assertInstanceOf(e, ContainerException);
      assertEquals(e.message, `Cannot find value with key "no key"`);
    }
  });

  it("register value", () => {
    registerConstant(Keys.One, "One");

    assertEquals(container.isBound(Keys.One), true);
  });

  it("get value", () => {
    assertEquals(get<string>(Keys.One), "One");
    assertEquals(getOrNull<string>("no key"), null);
  });
});
