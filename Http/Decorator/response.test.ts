import { assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Keys, registerConstant } from "../../Ioc/mod.ts";
import { ROUTE } from "../../Routing/Route/Decorator/mod.ts";
import { HttpResponse } from "../mod.ts";
import { response } from "./mod.ts";

registerConstant(Keys.Response, new HttpResponse());

class FakeController {
  @ROUTE("index", "/")
  public index(@response response: unknown): Response {
    assertInstanceOf(response, HttpResponse);

    return new Response();
  }
}

describe("Http", () => {
  describe("Decorator", () => {
    describe("response", () => {
      it("response", () => {
        const controller = new FakeController();
        const response = controller.index("");

        assertInstanceOf(response, Response);
      });
    });
  });
});
