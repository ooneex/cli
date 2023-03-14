import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Header } from "./Header.ts";

describe("Http Header", () => {
  it("should be json", () => {
    const headers = new Headers();
    const header = new Header(headers);
    assertEquals(header.isJson(), false);
    header.set("Content-Type", "application/json");
    header.append("Content-Type", "application/pdf");
    assertEquals(header.isJson(), true);
  });

  it("should be text", () => {
    const headers = new Headers();
    const header = new Header(headers);
    assertEquals(header.isText(), false);
    header.append("Content-Type", "text/*");
    assertEquals(header.isText(), true);
    header.delete("Content-Type");
    assertEquals(header.isText(), false);
    header.append("Content-Type", "text/plain");
    assertEquals(header.isText(), true);
  });

  it("should be form data", () => {
    const headers = new Headers();
    const header = new Header(headers);
    assertEquals(header.isFormData(), false);
    header.add("Content-Type", "multipart/form-data");
    assertEquals(header.isFormData(), true);
    header.delete("Content-Type");
    assertEquals(header.isFormData(), false);
  });
});
