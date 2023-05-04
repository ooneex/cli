import { assertEquals, assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Keys, registerConstant } from "../../Ioc/mod.ts";
import { ROUTE } from "../../Routing/Route/Decorator/mod.ts";
import { DotEnvValueType } from "../types.ts";
import { env } from "./mod.ts";

const envValue = {
  APP_ENV: "local",
  LOCALE: "en-us",
  COUNTRY: "United States",
  VERSION: "1.0.0",
  SECRET: "50b8bc5f-7bf8-42cb-9a10-3a36575f3fea",
  DEBUG: true,
  PORT: 3000,
  HOST: "localhost",
};

registerConstant(Keys.Env.Default, envValue);

class FakeController {
  @ROUTE("index", "/")
  public index(@env() env: Record<string, DotEnvValueType>): Response {
    assertEquals(env, envValue);

    return new Response();
  }
}

describe("Env", () => {
  describe("Decorator", () => {
    it("env", () => {
      const controller = new FakeController();

      const response = controller.index({});

      assertInstanceOf(response, Response);
    });
  });
});
