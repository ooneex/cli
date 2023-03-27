import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { validate } from "uuid-v4";
import { env } from "./Env.ts";

await env.parse();

describe("App/Env", () => {
  describe("APP_ENV", () => {
    it("isDev", () => {
      assertEquals(env.isDev(), true);
    });

    it("isProd", () => {
      assertEquals(env.isProd(), false);
    });

    it("isTest", () => {
      assertEquals(env.isTest(), false);
    });
  });

  it("isApi", () => {
    assertEquals(env.isApi(), true);
  });

  it("locale", () => {
    assertEquals(env.getLocale(), "en-us");
  });

  it("country", () => {
    assertEquals(env.getCountry(), "United States");
  });

  it("version", () => {
    assertEquals(env.getVersion(), "1.0.0");
  });

  it("secret", () => {
    assertEquals(validate(env.getSecret() as string), true);
  });

  it("debug", () => {
    assertEquals(env.isDebug(), true);
  });

  it("port", () => {
    assertEquals(env.getPort(), 3000);
  });

  it("host", () => {
    assertEquals(env.getHost(), "localhost");
  });

  it("ssl", () => {
    assertEquals(env.isSsl(), false);
  });
});
