import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Route } from "../mod.ts";
import routeDefinition from "./example_route.ts";

describe("Route", () => {
  it("Should handle default values", () => {
    const route = new Route({ name: "route_name", path: "/products" });
    assertEquals(route.getProtocols(), null);
    assertEquals(route.getHosts(), null);
    assertEquals(route.getIps(), null);
    assertEquals(route.getPorts(), null);
    assertEquals(route.getDefault(), null);
    assertEquals(route.getMethods(), null);
    assertEquals(route.getData(), null);
    assertEquals(route.getLocales(), null);
    assertEquals(route.getRoles(), null);
    assertEquals(route.getEnvs(), null);
    assertEquals(route.getVersions(), null);
    assertEquals(route.getHandler(), null);
    assertEquals(route.getView(), null);
    assertEquals(route.getMiddleware(), null);
    assertEquals(route.getFixture(), null);
    assertEquals(route.getDescription(), null);
  });

  it("Should handle route definition", () => {
    const route = new Route(routeDefinition);

    assertEquals(route.getPath(), "/products/:id/:name");
    assertEquals(route.getProtocols(), ["https", "http"]);
    assertEquals(route.getHosts(), ["api.ooneex.io", "ooneex.io"]);
    assertEquals(route.getIps(), ["127.0.0.1"]);
    assertEquals(route.getPorts(), ["80", "8000"]);
    assertEquals(route.getDefault(), {
      id: "58806cc0-f564-45ea-8266-198967a08503",
      name: "Doe",
    });
    assertEquals(route.getMethods(), ["GET", "POST"]);
    assertEquals(route.getData(), {
      color: "red",
      size: 42,
    });
    assertEquals(route.getLocales(), ["fr", "en"]);
    assertEquals(route.getRoles(), ["ROLE_USER", "ROLE_ADMIN"]);
    assertEquals(route.getEnvs(), ["dev", "test", "prod"]);
    assertEquals(route.getVersions(), ["1.2.3", "2.0.0"]);
    assertEquals(route.getHandler(), null);
    assertEquals(route.getView(), null);
    assertEquals(route.getMiddleware(), null);
    assertEquals(route.getFixture(), "users.ts");
    assertEquals(route.getDescription(), "Route description");

    const constraints = route.getConstraints();
    assertEquals(constraints?.where, { price: 30, name: "keyboard" });
    assertEquals(constraints?.regex, { price: "^[0-9]+$", name: "^[a-z0-9]+$" });
    assertEquals(constraints?.number, [ "part" ]);
    assertEquals(constraints?.alphaNumeric, [ "code" ]);
    assertEquals(constraints?.uuid, [ "id" ]);
    assertEquals(constraints?.in, { name: [ "Doe", "Obama" ] });
  });
});
