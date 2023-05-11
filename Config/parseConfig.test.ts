import { assertEquals, assertInstanceOf } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { ConfigException } from "./ConfigException.ts";
import { parseConfig } from "./parseConfig.ts";

describe("Config", () => {
  it("parseConfig", async () => {
    try {
      await parseConfig();
    } catch (e) {
      assertInstanceOf(e, ConfigException, "check instance");
      assertEquals(
        e.message,
        "Cannot import app config",
        "check error message",
      );

      const data = e.getData<{ file: string; message: string }>();

      assertEquals(data?.file, "config/app/app.config.ts", "check data file");
    }
  });
});
