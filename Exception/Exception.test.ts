import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Exception } from "./Exception.ts";

class FakeException extends Exception {}

describe("Exception", () => {
  const fakeException = new FakeException("Fake exception");

  it("should valid name", () => {
    assertEquals(fakeException.getName(), "FakeException");
  });

  it("should valid message", () => {
    assertEquals(fakeException.getMessage(), "Fake exception");
  });

  it("should valid stack", () => {
    assertEquals(fakeException.getStack().length, 4);
  });

  it("should valid file", () => {
    assertEquals(fakeException.getFile(), "Exception/Exception.test.ts");
  });

  it("should valid line", () => {
    assertEquals(fakeException.getLine(), 8);
  });

  it("should valid column", () => {
    assertEquals(fakeException.getColumn(), 25);
  });
});
