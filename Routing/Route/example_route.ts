import { RouteDefinitionType } from "./types.ts";

const routeDefinition: RouteDefinitionType = {
  name: "homepage",
  path: "/products/:id/:name",
  protocols: ["https", "http"],
  hosts: ["api.ooneex.io", "ooneex.io"],
  ips: ["127.0.0.1"],
  ports: [80, 8000],
  constraints: {
    where: { price: 30, name: "keyboard" },
    regex: { price: /^[0-9]+$/, name: /^[a-z0-9]+$/ },
    number: ["part"],
    alphaNumeric: ["code"],
    in: { name: ["Doe", "Obama"] },
  },
  default: {
    id: "58806cc0-f564-45ea-8266-198967a08503",
    name: "Doe",
  },
  methods: ["GET", "POST"],
  data: {
    color: "red",
    size: 42,
  },
  locales: ["fr", "en"],
  envs: ["development", "testing", "production"],
  versions: ["1.2.3", "2.0.0"],
  controller: (): Response => new Response(),
  description: "Route description",
};

export default routeDefinition;
