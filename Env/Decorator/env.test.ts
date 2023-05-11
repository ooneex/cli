import { Collection } from "@collection";
import { ControllerType } from "@controller";
import { Route } from "@decorator";
import { HttpResponse, Request } from "@http";
import { get, Keys, registerConstant } from "@ioc";
import { Route as HttpRoute, Router } from "@routing";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
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
    @env() env: Record<string, DotEnvValueType>,
  ): Response {
    assertNotEquals(env, null);
    assertEquals(env, envValue);

    return response.string("");
  }
}

describe("Env", () => {
  describe("Decorator", () => {
    it("env", () => {
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
