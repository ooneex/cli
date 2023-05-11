import { Collection } from "@collection";
import { Route } from "@decorator";
import { HttpRequest, HttpResponse } from "@http";
import { get, Keys, registerConstant } from "@ioc";
import { Route as HttpRoute, Router } from "@routing";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { Exception } from "../mod.ts";
import { exception } from "./mod.ts";

class FakeException extends Exception {}

const request = new HttpRequest();
const K = {
  Response: Symbol.for(`response-${crypto.randomUUID()}`),
  Exception: Symbol.for(`exception-${crypto.randomUUID()}`),
};
registerConstant(request.id, K);
registerConstant(K.Response, new HttpResponse());

const fakeException = new FakeException("Fake exception");
registerConstant(K.Exception, fakeException);

class FakeController {
  @Route("index", "/")
  public index(
    _request: HttpRequest,
    response: HttpResponse,
    @exception exception: Exception,
  ): Response {
    it("instance", () => {
      assertInstanceOf(exception, FakeException);
    });

    it("message", () => {
      assertEquals((exception as FakeException).message, "Fake exception");
    });

    it("name", () => {
      assertEquals((exception as FakeException).name, "FakeException");
    });

    return response.string("");
  }
}

describe("Exception", () => {
  describe("Decorator", async () => {
    new FakeController();
    const routes = get<Collection<string, HttpRoute>>(Keys.Routes);
    const router = new Router(routes);
    const route = router.findByName("index");
    assertNotEquals(route, null);

    const controller = route?.getController();
    const response = controller ? await controller(request) : null;

    it("response", () => {
      assertInstanceOf(response, Response);
    });
  });
});
