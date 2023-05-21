import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { MatchedRoute, Route } from "../mod.ts";
import { RouteChecker, RouteCheckerErrorType } from "./mod.ts";

describe("Route Checker", () => {
  let route = new Route({
    name: "user_show",
    path: "/users/:id",
    controller: () => new Response(),
  });

  const matched = new MatchedRoute({
    name: "user_show",
    url: new URL("http://localhost:8080/"),
    params: {
      id: crypto.randomUUID(),
      count: 23,
    },
    method: "GET",
    ip: "127.0.0.1",
    locale: "en",
    env: "development",
    version: "1.0.0",
  });

  let checker = new RouteChecker(route, matched);

  it("Should check method", () => {
    assertEquals(checker.checkMethod(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      methods: ["POST", "GET"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkMethod(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      methods: ["POST"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkMethod(), `Method "GET" not matched`);
  });

  it("Should check ip", () => {
    assertEquals(checker.checkIp(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      ips: ["127.0.0.1", "127.0.0.2"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkIp(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      ips: ["127.0.0.2"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkIp(), `IP "127.0.0.1" not matched`);
  });

  it("Should check locale", () => {
    assertEquals(checker.checkLocale(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      locales: ["da", "en", "fr"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkLocale(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      locales: ["da", "fr"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkLocale(), `Locale "en" not matched`);
  });

  it("Should check env", () => {
    assertEquals(checker.checkEnv(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      envs: ["development", "production"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkEnv(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      envs: ["testing", "production"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkEnv(), `Env "development" not matched`);
  });

  it("Should check version", () => {
    assertEquals(checker.checkVersion(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      versions: ["1.0.0", "1.0.1"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkVersion(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      versions: ["1.0.1", "1.0.2"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkVersion(), `Version "1.0.0" not matched`);
  });

  it("Should check host", () => {
    assertEquals(checker.checkHost(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      hosts: ["localhost", "api.ooneex.com"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkHost(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      hosts: ["api.ooneex.com"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkHost(), `Host "localhost" not matched`);
  });

  it("Should check protocol", () => {
    assertEquals(checker.checkProtocol(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      protocols: ["http"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkProtocol(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      protocols: ["https"],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkProtocol(), `Protocol "http" not matched`);
  });

  it("Should check port", () => {
    assertEquals(checker.checkPort(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      ports: [8080, 3000, 8000],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkPort(), true);

    route = new Route({
      name: "user_show",
      path: "/users/:id",
      ports: [3000, 8000],
      controller: () => new Response(),
    });
    checker = new RouteChecker(route, matched);
    assertEquals(checker.checkPort(), `Port "8080" not matched`);
  });

  describe("Router checker Constraints", () => {
    it("Should be valid without constraints", () => {
      assertEquals(checker.checkConstraints(), true);
    });

    it("Should check where constraints", () => {
      let route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {},
        controller: () => new Response(),
      });
      const matched = new MatchedRoute({
        name: "user_show",
        url: new URL("http://localhost:8080/"),
        params: {
          id: crypto.randomUUID(),
          count: 23,
        },
        method: "GET",
        ip: "127.0.0.1",
        locale: "en",
        env: "development",
        version: "1.0.0",
      });
      checker = new RouteChecker(route, matched);
      assertEquals(checker.checkConstraints(), true);
      route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {
          where: { id: crypto.randomUUID(), follower: crypto.randomUUID() },
        },
        controller: () => new Response(),
      });
      checker = new RouteChecker(route, matched);
      assertEquals(
        (checker.checkConstraints() as RouteCheckerErrorType[]).length,
        2,
      );
    });

    it("Should check regex constraints", () => {
      let route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {},
        controller: () => new Response(),
      });
      const matched = new MatchedRoute({
        name: "user_show",
        url: new URL("http://localhost:8080/"),
        params: {
          id: crypto.randomUUID(),
          count: 23,
        },
        method: "GET",
        ip: "127.0.0.1",
        locale: "en",
        env: "development",
        version: "1.0.0",
      });
      checker = new RouteChecker(route, matched);
      assertEquals(checker.checkConstraints(), true);
      route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {
          regex: { count: /d+/, ref: /[a-z]+/ },
        },
        controller: () => new Response(),
      });
      checker = new RouteChecker(route, matched);
      assertEquals(
        (checker.checkConstraints() as RouteCheckerErrorType[]).length,
        2,
      );
    });

    it("Should check number constraints", () => {
      let route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {},
        controller: () => new Response(),
      });
      const matched = new MatchedRoute({
        name: "user_show",
        url: new URL("http://localhost:8080/"),
        params: {
          id: crypto.randomUUID(),
          count: 23,
          user: "Doe",
        },
        method: "GET",
        ip: "127.0.0.1",
        locale: "en",
        env: "development",
        version: "1.0.0",
      });
      checker = new RouteChecker(route, matched);
      assertEquals(checker.checkConstraints(), true);
      route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {
          number: ["follower", "user"],
        },
        controller: () => new Response(),
      });
      checker = new RouteChecker(route, matched);
      assertEquals(
        (checker.checkConstraints() as RouteCheckerErrorType[]).length,
        2,
      );
    });

    it("Should check alphaNumeric constraints", () => {
      let route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {},
        controller: () => new Response(),
      });
      const matched = new MatchedRoute({
        name: "user_show",
        url: new URL("http://localhost:8080/"),
        params: {
          id: crypto.randomUUID(),
          count: 23,
          user: "doe",
        },
        method: "GET",
        ip: "127.0.0.1",
        locale: "en",
        env: "development",
        version: "1.0.0",
      });
      checker = new RouteChecker(route, matched);
      assertEquals(checker.checkConstraints(), true);
      route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {
          alphaNumeric: ["follower", "user"],
        },
        controller: () => new Response(),
      });
      checker = new RouteChecker(route, matched);
      assertEquals(
        (checker.checkConstraints() as RouteCheckerErrorType[]).length,
        2,
      );
    });

    it("Should check in constraints", () => {
      let route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {},
        controller: () => new Response(),
      });
      const matched = new MatchedRoute({
        name: "user_show",
        url: new URL("http://localhost:8080/"),
        params: {
          id: crypto.randomUUID(),
          count: 23,
        },
        method: "GET",
        ip: "127.0.0.1",
        locale: "en",
        env: "development",
        version: "1.0.0",
      });
      checker = new RouteChecker(route, matched);
      assertEquals(checker.isValid(), true);
      route = new Route({
        name: "user_show",
        path: "/users/:id/follower/:follower",
        constraints: {
          in: { count: [45, "doe"], ref: [] },
        },
        controller: () => new Response(),
      });
      checker = new RouteChecker(route, matched);
      assertEquals(checker.isValid(), false);
    });
  });
});
