import { assertEquals, assertObjectMatch } from "@ooneex/testing/asserts.ts";
import { afterAll, describe, it } from "@ooneex/testing/bdd.ts";
import { Helper } from "../deps.ts";
import { env } from "./Env.ts";
import { AppEnvVarsType } from "./types.ts";

const tempDir = Deno.makeTempDirSync();
const cwd = Deno.cwd();
Deno.chdir(tempDir);
env.ensure();
await env.parse();

describe("App Env", () => {
  afterAll(() => {
    try {
      Deno.chdir(cwd);
      Deno.removeSync(tempDir, { recursive: true });
    } catch (e) {
      console.log(e.message);
    }
  });

  it("get app env", () => {
    assertEquals(env.getAppEnv(), "dev");
    assertEquals(env.isDev(), true);
    assertEquals(env.isProd(), false);
    assertEquals(env.isTest(), false);
  });
  it("get app country", () => {
    assertEquals(env.getCountry(), "United States");
  });
  it("get app locale", () => {
    assertEquals(env.getLocale(), "en-us");
  });
  it("get app port", () => {
    assertEquals(env.getPort(), 3000);
  });
  it("get app secret", () => {
    const secret = env.getSecret() || "";
    assertEquals(Helper.isString(secret), true);
    assertEquals(secret.length > 0, true);
  });
  it("get app version", () => {
    assertEquals(env.getVersion(), "1.0.0");
  });
  it("debug is enabled", () => {
    assertEquals(env.isDebug(), true);
  });
  it("api is enabled", () => {
    assertEquals(env.isApi(), false);
  });
  it("same data", () => {
    assertObjectMatch(env.getData(), {
      APP_ENV: "dev",
      LOCALE: "en-us",
      COUNTRY: "United States",
      VERSION: "1.0.0",
      SECRET: env.getSecret(),
      DEBUG: true,
      PORT: 3000,
      HOST: "localhost",
    });
  });
  it("can set new data", () => {
    const data: AppEnvVarsType = {
      APP_ENV: "prod",
      API: false,
      LOCALE: "en-us",
      COUNTRY: "United States",
      VERSION: "1.0.0",
      SECRET: crypto.randomUUID(),
      DEBUG: false,
      PORT: 8080,
      HOST: "localhost",
      SSL: false,
    };
    env.setData(data);
    assertObjectMatch(env.getData(), data);
  });
});
