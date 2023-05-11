import { Collection } from "@collection";
import { ControllerType } from "@controller";
import { Route } from "@decorator";
import { Request, Response as HttpResponse } from "@http";
import { get, Keys, registerConstant } from "@ioc";
import { Route as HttpRoute, Router } from "@routing";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { appConfig } from "./mod.ts";

registerConstant(Keys.Config.App, "appConfig");

const req = new Request();

const K = {
  Response: Symbol.for(`response-${crypto.randomUUID()}`),
  Route: {
    Default: Symbol.for(`route-default-${crypto.randomUUID()}`),
    Params: Symbol.for(`route-params-${crypto.randomUUID()}`),
  },
  Exception: Symbol.for(`exception-${crypto.randomUUID()}`),
};
registerConstant(req.id, K);

const response = new HttpResponse();
registerConstant(K.Response, response);

class FakeController {
  @Route("index", "/")
  public index(
    _request: Request,
    response: HttpResponse,
    @appConfig config: string,
  ): Response {
    assertEquals(config, "appConfig");

    return response.string("");
  }
}

describe("Config", () => {
  describe("Decorator", () => {
    it("appConfig", () => {
      new FakeController();
      const routes = get<Collection<string, HttpRoute>>(Keys.Routes);
      const router = new Router(routes);
      const route = router.findByName("index");
      assertNotEquals(route, null);

      const controller = route?.getController() as ControllerType;
      const response = controller(req);
      assertInstanceOf(response, Response);
    });
  });
});
