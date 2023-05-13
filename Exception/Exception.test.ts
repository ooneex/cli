import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { Exception } from "./Exception.ts";

class FakeException extends Exception {}

describe("Exception", () => {
  const fakeException = new FakeException("Fake exception", 404);

  it("name", () => {
    assertEquals(fakeException.name, "FakeException");
  });

  it("message", () => {
    assertEquals(fakeException.message, "Fake exception");
  });

  it("stack", () => {
    assertEquals(fakeException.stacks.length, 4);
  });

  it("line", () => {
    assertEquals(fakeException.line, 8);
  });

  it("column", () => {
    assertEquals(fakeException.column, 25);
  });

  it("status", () => {
    assertEquals(fakeException.status, 404);
  });

  it("data", () => {
    assertEquals(fakeException.getData<null>(), null);
  });
});
