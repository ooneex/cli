import { assertEquals, assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Keys, registerConstant } from "../../Ioc/mod.ts";
import { ROUTE } from "../../Routing/Route/Decorator/mod.ts";
import { Exception } from "../mod.ts";
import { exception } from "./mod.ts";

class FakeException extends Exception {}

const fakeException = new FakeException("Fake exception");
registerConstant(Keys.Exception, fakeException);

class FakeController {
  @ROUTE("index", "/")
  public index(@exception exception: unknown): Response {
    it("instance", () => {
      assertInstanceOf(exception, FakeException);
    });

    it("message", () => {
      assertEquals((exception as FakeException).message, "Fake exception");
    });

    it("name", () => {
      assertEquals((exception as FakeException).name, "FakeException");
    });

    return new Response();
  }
}

describe("Exception", () => {
  describe("Decorator", () => {
    const controller = new FakeController();
    const response = controller.index("");

    it("response", () => {
      assertInstanceOf(response, Response);
    });
  });
});
