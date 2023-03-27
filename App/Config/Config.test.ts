import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { AppFullDirectoryType } from "../Directory/types.ts";
import { config } from "./Config.ts";

await config.parse();

describe("App/Config", () => {
  describe("directories", () => {
    const errors = config.getErrors();

    describe("notFound", () => {
      it("view", () => {
        assertEquals(errors?.notFound.view, "Exception/NotFoundView");
      });
      it("handler", () => {
        assertEquals(errors?.notFound.handler.name, "NotFoundHandler");
      });
    });

    describe("server", () => {
      it("view", () => {
        assertEquals(errors?.server.view, "Exception/ServerErrorView");
      });
      it("handler", () => {
        assertEquals(errors?.server.handler.name, "ServerErrorHandler");
      });
    });
  });

  describe("directories", () => {
    const directories = config.getDirectories() as AppFullDirectoryType;

    it("bin", () => {
      assertEquals(directories.bin, "bin");
    });

    it("config", () => {
      assertEquals(directories.config, "config");
    });

    it("fixtures", () => {
      assertEquals(directories.fixtures, "fixtures");
    });

    it("handlers", () => {
      assertEquals(directories.handlers, "handlers");
    });

    it("middlewares", () => {
      assertEquals(directories.middlewares, "middlewares");
    });

    it("migrations", () => {
      assertEquals(directories.migrations, "migrations");
    });

    it("routes", () => {
      assertEquals(directories.routes, "routes");
    });

    it("var", () => {
      assertEquals(directories.var, "var");
    });

    it("components", () => {
      assertEquals(directories.components, "components");
    });

    it("islands", () => {
      assertEquals(directories.islands, "islands");
    });

    it("static", () => {
      assertEquals(directories.static, "static");
    });

    it("views", () => {
      assertEquals(directories.views, "views");
    });
  });
});
