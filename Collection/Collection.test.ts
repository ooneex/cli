import { assertEquals, assertNotEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Collection } from "./mod.ts";

type ValueType = { name: string; price: number };

describe("Collection", () => {
  const products = new Collection<string, ValueType>();

  products.add("mouse", { name: "mouse", price: 20 });
  products.add("monitor", { name: "monitor", price: 400 });

  it("count", () => {
    assertEquals(products.count(), 2);
  });

  it("keys", () => {
    const keys = products.keys();
    let key = keys.next();
    assertEquals(key.value, "mouse");
    key = keys.next();
    assertEquals(key.value, "monitor");
  });

  it("values", () => {
    const values = products.values();
    let key = values.next();
    assertEquals(key.value, { name: "mouse", price: 20 });
    key = values.next();
    assertEquals(key.value, { name: "monitor", price: 400 });
  });

  it("has", () => {
    assertEquals(products.has("monitor"), true);
    assertEquals(products.has("keyboard"), false);
  });

  it("get", () => {
    assertEquals(products.get("mouse")?.price, 20);
  });

  it("search", () => {
    const monitor = products.search(/R$/i);
    assertEquals(monitor.count(), 1);
    const keys = monitor.keys();
    const key = keys.next();
    assertEquals(key.value, "monitor");
  });

  it("find", () => {
    const mouse = products.find((value, _key, _map) => value.price < 30);
    assertNotEquals(mouse?.first(), null);
    assertEquals(mouse?.first()?.key, "mouse");
  });

  it("remove", () => {
    products.remove("monitor");
    assertEquals(products.get("monitor"), undefined);
    assertEquals(products.count(), 1);
  });

  it("clear", () => {
    products.clear();
    assertEquals(products.count(), 0);
  });
});
