import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Path } from "./mod.ts";

describe("Path", () => {
  it("isAbsolute", () => {
    assertEquals(Path.isAbsolute("/"), true);
    assertEquals(Path.isAbsolute("./"), false);
  });
  it("isRelative", () => {
    assertEquals(Path.isRelative("/"), false);
    assertEquals(Path.isRelative("./"), true);
  });
  it("join", () => {
    assertEquals(Path.join("dir", "index.ts"), `dir${Path.DS}index.ts`);
  });
  it("normalize", () => {
    assertEquals(
      Path.normalize("/home/foo/bar/../hoge/./piyo"),
      "/home/foo/hoge/piyo",
    );
    assertEquals(Path.normalize("foo/bar/../hoge/./piyo"), "foo/hoge/piyo");
    assertEquals(Path.normalize("userSwitch/foo/.."), "userSwitch");
  });
  it("relative", () => {
    assertEquals(Path.relative("/var/lib", "/var/apache"), "../apache");
  });
  it("resolve", () => {
    assertEquals(Path.resolve("/var/lib", "../", "file/"), "/var/file");
  });

  it("basename", () => {
    assertEquals(Path.basename("/var/lib/deno"), "deno");
  });

  it("dirname", () => {
    assertEquals(Path.dirname("/var/lib/deno/test.txt"), "/var/lib/deno");
  });
});
