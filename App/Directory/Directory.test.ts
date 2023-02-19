import { assertEquals } from "@ooneex/testing/asserts.ts";
import { afterAll, describe, it } from "@ooneex/testing/bdd.ts";
import { AppDirectory } from "./AppDirectory.ts";

const tempDir = Deno.makeTempDirSync();
const cwd = Deno.cwd();
Deno.chdir(tempDir);

describe("App Directory", () => {
  const appDirectory = new AppDirectory();

  afterAll(() => {
    try {
      Deno.chdir(cwd);
      Deno.removeSync(tempDir, { recursive: true });
    } catch (e) {
      console.log(e.message);
    }
  });

  describe("Should create directories", () => {
    appDirectory.ensure();
    it("components", () => {
      assertEquals(appDirectory.data.components, "components");
    });
    it("config", () => {
      assertEquals(appDirectory.data.config, "config");
    });
    it("handlers", () => {
      assertEquals(appDirectory.data.handlers, "handlers");
    });
    it("islands", () => {
      assertEquals(appDirectory.data.islands, "islands");
    });
    it("middlewares", () => {
      assertEquals(appDirectory.data.middlewares, "middlewares");
    });
    it("routes", () => {
      assertEquals(appDirectory.data.routes, "routes");
    });
    it("static", () => {
      assertEquals(appDirectory.data.static, "static");
    });
    it("var", () => {
      assertEquals(appDirectory.data.var, "var");
    });
    it("fixtures", () => {
      assertEquals(appDirectory.data.fixtures, "fixtures");
    });
    it("migrations", () => {
      assertEquals(appDirectory.data.migrations, "migrations");
    });
    it("views", () => {
      assertEquals(appDirectory.data.views, "views");
    });
  });
});
