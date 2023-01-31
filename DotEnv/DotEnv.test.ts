import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { DotEnv } from "./mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const dotEnv = new DotEnv();
await dotEnv.parse(__dirname + ".env.test");

describe("DotEnv", () => {
  it("Should parse env file", () => {
    assertEquals(undefined, dotEnv.get("NO_KEY"), "No key found");
    assertEquals(18, dotEnv.get("MIN_AGE"), "Get int value");
    assertEquals(42.42, dotEnv.get("MIN_PRICE"), "Get float value");
    assertEquals(true, dotEnv.get("IS_LEGAL"), "Get true value");
    assertEquals(false, dotEnv.get("IS_MINOR"), "Get false value");
    assertEquals("dev", dotEnv.get("ENV"), "Get simple text");
    assertEquals(
      "smtp://my-host=*",
      dotEnv.get("MAILER_DSN"),
      "Get complex text",
    );
    assertEquals(
      dotEnv.entries(),
      [
        "ENV",
        "LOCALE",
        "COUNTRY",
        "TYPE",
        "VERSION",
        "SECRET",
        "HOSTS",
        "IP",
        "PROTOCOLS",
        "DDD",
        "DEBUG",
        "PORT",
        "MAILER_DSN",
        "MIN_AGE",
        "MIN_PRICE",
        "IS_LEGAL",
        "IS_MINOR",
      ],
    );
    assertEquals(false, dotEnv.has("NO_KEY"), "No key found");
    assertEquals(true, dotEnv.has("ENV"), "Key found");
  });
});
