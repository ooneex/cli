import { assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Keys, registerConstant } from "../../Ioc/mod.ts";
import { ROUTE } from "../../Routing/Route/Decorator/mod.ts";
import { HttpRequest } from "../mod.ts";
import { request } from "./mod.ts";

registerConstant(Keys.Request, new HttpRequest());

class FakeController {
  @ROUTE("index", "/")
  public index(@request request: unknown): Response {
    assertInstanceOf(request, HttpRequest);

    return new Response();
  }
}

describe("Http", () => {
  describe("Decorator", () => {
    describe("request", () => {
      it("response", () => {
        const controller = new FakeController();
        const response = controller.index("");

        assertInstanceOf(response, Response);
      });
    });
  });
});
