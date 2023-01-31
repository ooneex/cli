import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Collection } from "./mod.ts";

type ValueType = { name: string; price: number };

describe("Collection", () => {
  const products = new Collection<string, ValueType>();

  products
    .add("mouse", { name: "mouse", price: 20 })
    .add("monitor", { name: "monitor", price: 400 });

  it("count", () => {
    assertEquals(products.count(), 2);
  });

  it("entries/keys", () => {
    assertEquals(products.entries(), ["mouse", "monitor"]);
    assertEquals(products.keys(), products.entries());
  });

  it("values", () => {
    assertEquals(products.values(), [{ name: "mouse", price: 20 }, {
      name: "monitor",
      price: 400,
    }]);
  });

  it("has", () => {
    assertEquals(products.has("monitor"), true);
    assertEquals(products.has("keyboard"), false);
  });

  it("get", () => {
    assertEquals(products.get<ValueType>("mouse")?.price, 20);
  });

  it("search", () => {
    const monitor = products.search(/R$/i);
    assertEquals(monitor.count(), 1);
    assertEquals(monitor.entries(), ["monitor"]);
  });

  it("remove", () => {
    products.remove("monitor");
    assertEquals(products.get("monitor"), undefined);
    assertEquals(products.count(), 1);
  });

  it("clear", () => {
    products.clear();
    assertEquals(products.count(), 0);
    assertEquals(products.entries(), []);
    assertEquals(products.values(), []);
  });
});
