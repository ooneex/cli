import { Collection } from "@collection";
import { assertEquals, assertInstanceOf } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { Header } from "../Header/mod.ts";
import { HttpResponse, HttpStatusType } from "../mod.ts";

describe("Http", () => {
  describe("HttpResponse", () => {
    const response = new HttpResponse();

    describe("default values", () => {
      it("body", () => {
        assertInstanceOf(response.body, Collection);
      });

      it("status", () => {
        assertEquals(response.status, HttpStatusType.OK);
      });

      it("header", () => {
        assertInstanceOf(response.header, Header);
      });
    });

    describe("string response", () => {
      const resp = response.string("Hello");
      it("body", async () => {
        assertEquals(await resp.text(), "Hello");
      });
      it("status", () => {
        assertEquals(resp.status, HttpStatusType.OK);
      });

      it("content type", () => {
        assertEquals(
          resp.headers.get("Content-Type"),
          "text/plain; charset=utf-8",
        );
      });
    });

    describe("html response", () => {
      const resp = response.html("<p>Hello</p>");
      it("body", async () => {
        assertEquals(await resp.text(), "<p>Hello</p>");
      });
      it("status", () => {
        assertEquals(resp.status, HttpStatusType.OK);
      });

      it("content type", () => {
        assertEquals(
          resp.headers.get("Content-Type"),
          "text/html; charset=utf-8",
        );
      });
    });

    describe("json response", () => {
      const resp = response.json({ message: "Hello" });
      it("body", async () => {
        assertEquals(await resp.json(), { message: "Hello" });
      });
      it("status", () => {
        assertEquals(resp.status, HttpStatusType.OK);
      });

      it("content type", () => {
        assertEquals(
          resp.headers.get("Content-Type"),
          "application/json; charset=utf-8",
        );
      });
    });
  });
});
