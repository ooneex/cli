import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { get, Keys } from "../../Ioc/mod.ts";
import { ControllerType } from "../types.ts";
import { NotFound } from "./mod.ts";

class NotFoundController {
  @NotFound()
  public index(): Response {
    return new Response("not found", { status: 404 });
  }
}

describe("Controller", () => {
  describe("Decorator", () => {
    describe("NotFound", () => {
      new NotFoundController();

      const controller = get<ControllerType>(Keys.Controller.NotFound);

      it("check method", () => {
        assertNotEquals(controller, null);
        assertEquals(typeof controller, "function");
      });

      it("response", async () => {
        const response = controller();
        assertInstanceOf(response, Response);
        assertEquals(response.status, 404);
        assertEquals(await response.text(), "not found");
      });
    });
  });
});
