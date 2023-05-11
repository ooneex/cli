import { Exception } from "@exception";
import { HttpStatusType, Response as HttpResponse } from "@http";
import { get, Keys } from "@ioc";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { ServerErrorControllerType } from "../types.ts";
import { ServerError } from "./mod.ts";

class ServerErrorController {
  @ServerError()
  public index(_exception: Exception, response: HttpResponse): Response {
    return response.string("server error", HttpStatusType.InternalServerError);
  }
}

describe("Controller", () => {
  describe("Decorator", () => {
    describe("ServerError", () => {
      new ServerErrorController();

      const controller = get<ServerErrorControllerType>(
        Keys.Controller.ServerError,
      );

      it("check method", () => {
        assertNotEquals(controller, null);
        assertEquals(typeof controller, "function");
      });

      it("response", async () => {
        const response = controller(new Exception("error"), new HttpResponse());
        assertInstanceOf(response, Response);
        assertEquals(response.status, 500);
        assertEquals(await response.text(), "server error");
      });
    });
  });
});
