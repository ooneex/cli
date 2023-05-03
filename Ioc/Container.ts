import { Container as Ioc } from "./deps.ts";

const container = new Ioc({ defaultScope: "Singleton" });
export { container };
