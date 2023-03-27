import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Header } from "./mod.ts";

describe("Http Header", () => {
  it("should set charset", () => {
    const header = new Header();
    header.json();
    assertEquals(
      header.getContentType(),
      "application/json; charset=utf-8, application/ld+json; charset=utf-8",
    );
    header.clear().setCharset("iso-8859-1").text();
    assertEquals(header.getContentType(), "text/*; charset=iso-8859-1");
  });

  it("should be blob", () => {
    const header = new Header();
    assertEquals(header.isBlob(), false);
    header.blob();
    assertEquals(header.isBlob(), true);
  });

  it("should be json", () => {
    const header = new Header();
    assertEquals(header.isJson(), false);
    header.json();
    header.append("Content-Type", "application/pdf");
    assertEquals(header.isJson(), true);
  });

  it("should be text", () => {
    const header = new Header();
    assertEquals(header.isText(), false);
    header.text();
    assertEquals(header.isText(), true);
    header.delete("Content-Type");
    assertEquals(header.isText(), false);
    header.append("Content-Type", "text/plain");
    assertEquals(header.isText(), true);
  });

  it("should be form data", () => {
    const header = new Header();
    assertEquals(header.isFormData(), false);
    header.formData();
    assertEquals(header.isFormData(), true);
    header.delete("Content-Type");
    assertEquals(header.isFormData(), false);
  });

  it("should get keys", () => {
    const header = new Header();
    header.add("Content-Type", "multipart/form-data");
    header.add("Accept-Charset", "UTF-8");
    assertEquals(header.keys(), ["accept-charset", "content-type"]);
    header.clear();
    assertEquals(header.keys(), []);
  });

  it("should count keys", () => {
    const header = new Header();
    assertEquals(header.hasData(), false);
    header.add("Content-Type", "multipart/form-data");
    header.add("Accept-Charset", "UTF-8");
    assertEquals(header.count(), 2);
    assertEquals(header.hasData(), true);
    header.clear();
    assertEquals(header.count(), 0);
  });

  it("should set authorization", () => {
    const header = new Header();
    assertEquals(header.hasData(), false);
    header.setAuthorization("hello");
    assertEquals(header.getAuthorization(), "hello");
  });

  it("should set basic auth", () => {
    const header = new Header();
    header.setBasicAuth("fake-basic-auth");
    assertEquals(header.getBasicAuth(), "fake-basic-auth");
  });

  it("should set bearer auth", () => {
    const header = new Header();
    header.setBearer("fake-bearer-auth");
    assertEquals(header.getBearer(), "fake-bearer-auth");
  });
});
