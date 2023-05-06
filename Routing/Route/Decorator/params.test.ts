import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Collection } from "../../../Collection/mod.ts";
import { ControllerType } from "../../../Controller/mod.ts";
import { response } from "../../../Http/Decorator/mod.ts";
import { HttpResponse } from "../../../Http/mod.ts";
import { get, Keys, registerConstant } from "../../../Ioc/mod.ts";
import { Router } from "../../Router/mod.ts";
import { Route } from "../mod.ts";
import { params, ROUTE } from "./mod.ts";

registerConstant(Keys.Response, new HttpResponse());

class Controller {
  @ROUTE("index", "/")
  public index(
    @response response: HttpResponse,
    @params params: Record<string, string>,
  ): Response {
    assertEquals(params, {});
    return response.json({ message: "hi" });
  }
}

describe("Routing", () => {
  describe("Route", () => {
    describe("Decorator", () => {
      new Controller();
      const routes = get<Collection<string, Route>>(Keys.Routes);
      const router = new Router(routes);

      it("get params", () => {
        const route = router.findByName("index");

        assertNotEquals(route, null);
        assertEquals(route?.getName(), "index");
        assertEquals(route?.getPath(), "/");

        const method = route?.getController() as ControllerType;
        const response = method();

        assertInstanceOf(response, Response);
      });
    });
  });
});
