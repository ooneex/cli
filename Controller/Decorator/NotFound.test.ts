import { HttpResponse, HttpStatusType, Request } from "@http";
import { get, Keys, registerConstant } from "@ioc";
import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { ControllerType } from "../types.ts";
import { NotFound } from "./mod.ts";

const request = new Request();
const K = {
  Response: Symbol.for(`response-${crypto.randomUUID()}`),
  Exception: Symbol.for(`exception-${crypto.randomUUID()}`),
};
registerConstant(request.id, K);
registerConstant(K.Response, new HttpResponse());

class NotFoundController {
  @NotFound()
  public index(_request: Request, response: HttpResponse): Response {
    return response.string("not found", HttpStatusType.NotFound);
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
        const response = controller(request);
        assertInstanceOf(response, Response);
        assertEquals(response.status, 404);
        assertEquals(await response.text(), "not found");
      });
    });
  });
});
