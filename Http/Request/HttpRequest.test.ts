import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { HttpRequest } from "./HttpRequest.ts";

describe("Http Request", () => {
  it("should check pattern", () => {
    const request = new Request("https://github.com/issues/12959");
    const httpRequest = new HttpRequest(request);

    assertEquals(httpRequest.getParams("/user"), null);
    assertEquals(httpRequest.getParams<Record<"id", string>>("/issues/:id"), {
      id: "12959",
    });
    assertEquals(httpRequest.getParams("/issues/12959"), null);
  });
});
