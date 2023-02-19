import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { AppDirectoryType } from "../Directory/types.ts";
import { config } from "./Config.ts";

describe("App Config", async () => {
  await config.parse();
  describe("Should parse directories", () => {
    const directories = config.getDirectories() as AppDirectoryType;
    it("components", () => {
      assertEquals(directories.components, "components");
    });
    it("config", () => {
      assertEquals(directories.config, "config");
    });
    it("handlers", () => {
      assertEquals(directories.handlers, "handlers");
    });
    it("islands", () => {
      assertEquals(directories.islands, "islands");
    });
    it("middlewares", () => {
      assertEquals(directories.middlewares, "middlewares");
    });
    it("routes", () => {
      assertEquals(directories.routes, "routes");
    });
    it("static", () => {
      assertEquals(directories.static, "static");
    });
    it("var", () => {
      assertEquals(directories.var, "var");
    });
    it("migrations", () => {
      assertEquals(directories.migrations, "migrations");
    });
    it("fixtures", () => {
      assertEquals(directories.fixtures, "fixtures");
    });
    it("views", () => {
      assertEquals(directories.views, "views");
    });
  });
});
