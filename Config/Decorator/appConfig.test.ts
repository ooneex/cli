import { assertEquals, assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Keys, registerConstant } from "../../Ioc/mod.ts";
import { ROUTE } from "../../Routing/Route/Decorator/mod.ts";
import { appConfig } from "./mod.ts";

registerConstant(Keys.Config.App, "appConfig");

class FakeController {
  @ROUTE("index", "/")
  public index(@appConfig config: string): Response {
    assertEquals(config, "appConfig");
    return new Response();
  }
}

describe("Config", () => {
  describe("Decorator", () => {
    it("appConfig", () => {
      const controller = new FakeController();
      const response = controller.index("");

      assertInstanceOf(response, Response);
    });
  });
});
