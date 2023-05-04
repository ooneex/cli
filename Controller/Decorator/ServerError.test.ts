import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { get, Keys } from "../../Ioc/mod.ts";
import { ControllerType } from "../types.ts";
import { ServerError } from "./mod.ts";

class ServerErrorController {
  @ServerError()
  public index(): Response {
    return new Response("server error", { status: 500 });
  }
}

describe("Controller", () => {
  describe("Decorator", () => {
    describe("ServerError", () => {
      new ServerErrorController();

      const controller = get<ControllerType>(Keys.Controller.ServerError);

      it("check method", () => {
        assertNotEquals(controller, null);
        assertEquals(typeof controller, "function");
      });

      it("response", async () => {
        const response = controller();
        assertInstanceOf(response, Response);
        assertEquals(response.status, 500);
        assertEquals(await response.text(), "server error");
      });
    });
  });
});
