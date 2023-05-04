import { assertEquals, assertInstanceOf } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Collection } from "../../Collection/mod.ts";
import { Keys, registerConstant } from "../../Ioc/mod.ts";
import { ROUTE } from "../../Routing/Route/Decorator/mod.ts";
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

class FakeController {
  @ROUTE("index", "/")
  public index(@envHelper envHelper: unknown): Response {
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

    return new Response();
  }
}

describe("Env", () => {
  describe("Decorator", () => {
    describe("envHelper", () => {
      const controller = new FakeController();

      const response = controller.index({});

      assertInstanceOf(response, Response);
    });
  });
});
