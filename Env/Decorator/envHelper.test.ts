import { Collection } from "@collection";
import { ControllerType } from "@controller";
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
import { DotEnvValueType, EnvHelper } from "../mod.ts";
import { envHelper } from "./mod.ts";

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

const data = new Collection<string, DotEnvValueType>();
data.setData(envValue);

registerConstant(Keys.Env.Default, data);
registerConstant(Keys.Env.Helper, new EnvHelper());

const req = new HttpRequest();

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
    _request: HttpRequest,
    response: HttpResponse,
    @envHelper envHelper: unknown,
  ): Response {
    it("instance", () => {
      assertInstanceOf(envHelper, EnvHelper);
    });

    it("getAppEnv", () => {
      assertEquals((envHelper as EnvHelper).getAppEnv(), "local");
    });

    it("isDevelopment", () => {
      assertEquals((envHelper as EnvHelper).isDevelopment(), false);
    });

    it("isisLocal", () => {
      assertEquals((envHelper as EnvHelper).isLocal(), true);
    });

    it("isProduction", () => {
      assertEquals((envHelper as EnvHelper).isProduction(), false);
    });

    it("isTesting", () => {
      assertEquals((envHelper as EnvHelper).isTesting(), false);
    });

    it("isStaging", () => {
      assertEquals((envHelper as EnvHelper).isStaging(), false);
    });

    it("getLocale", () => {
      assertEquals((envHelper as EnvHelper).getLocale(), "en-us");
    });

    it("getCountry", () => {
      assertEquals((envHelper as EnvHelper).getCountry(), "United States");
    });

    it("getVersion", () => {
      assertEquals((envHelper as EnvHelper).getVersion(), "1.0.0");
    });

    it("getSecret", () => {
      assertEquals(
        (envHelper as EnvHelper).getSecret(),
        "50b8bc5f-7bf8-42cb-9a10-3a36575f3fea",
      );
    });

    it("isDebug", () => {
      assertEquals((envHelper as EnvHelper).isDebug(), true);
    });

    it("getPort", () => {
      assertEquals((envHelper as EnvHelper).getPort(), 3000);
    });

    it("getHost", () => {
      assertEquals((envHelper as EnvHelper).getHost(), "localhost");
    });

    return response.string("");
  }
}

describe("Env", () => {
  describe("Decorator", () => {
    describe("envHelper", () => {
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
