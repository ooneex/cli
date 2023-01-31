import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { Helper } from "./mod.ts";

describe("Helper", () => {
  describe("Trim", () => {
    const cases = [
      { text: "    Hello    ", char: " " },
      { text: "/Hello/", char: "/" },
      { text: "/ Hello/ ", char: "/ " },
      { text: "|Hello|", char: "\\|" },
      { text: ".Hello.", char: "\\." },
    ];

    cases.map((c) => {
      it(`"${c.char}"`, () => {
        assertEquals(Helper.trim(c.text, c.char), "Hello");
      });
    });
  });

  describe("Types", () => {
    it("object", () => {
      const object = {};
      assertEquals(Helper.isObject(object), true);
      assertEquals(Helper.isObject(42), false);
    });

    it("number", () => {
      assertEquals(Helper.isNumber(42), true);
    });

    it("string", () => {
      assertEquals(Helper.isString("hey"), true);
    });

    it("boolean", () => {
      assertEquals(Helper.isBoolean(false), true);
      assertEquals(Helper.isBoolean(true), true);
    });

    it("array", () => {
      assertEquals(Helper.isArray([]), true);
      assertEquals(Helper.isArray({}), false);
    });

    it("regexp", () => {
      assertEquals(Helper.isRegExp(/[a-z]/), true);
    });

    it("isFunction", () => {
      assertEquals(Helper.isFunction((): boolean => true), true);
    });

    it("isNull", () => {
      assertEquals(Helper.isNull(null), true);
    });

    it("isFalse", () => {
      assertEquals(Helper.isFalse(false), true);
    });

    it("isTrue", () => {
      assertEquals(Helper.isTrue(true), true);
    });

    it("isBlank", () => {
      assertEquals(Helper.isBlank("   "), true);
    });

    it("empty", () => {
      assertEquals(Helper.isEmpty({}), true);
      assertEquals(Helper.isEmpty(""), true);
      assertEquals(Helper.isEmpty([]), true);
    });
  });

  describe("Handle object", () => {
    const object = {
      name: "John",
      age: 42,
      friends: { name: "Obama", age: 62 },
    };

    assertEquals(Helper.getByKey(object, "name"), "John");
    assertEquals(Helper.getByKey(object, "firstname"), undefined);
    assertEquals(Helper.getByKey(object, "friends"), {
      name: "Obama",
      age: 62,
    });
    assertEquals(Helper.getByKey(object, "friends.name"), "Obama");
    assertEquals(Helper.getByKey(object, "friends.age"), 62);
    assertEquals(Helper.getByKey(object, "friends.firstname"), undefined);

    assertEquals(Helper.hasProperty(object, "name"), true);
    assertEquals(Helper.hasProperty(object, "firstname"), false);
    assertEquals(Helper.hasProperty(object, "friends"), true);
    assertEquals(Helper.hasProperty(object, "friends.firstname"), false);
    assertEquals(Helper.hasProperty(object, "friends.name"), true);
  });

  describe("ucFirst", () => {
    assertEquals(Helper.ucFirst("my string"), "My string");
  });

  describe("lcFirst", () => {
    assertEquals(Helper.lcFirst("UserSwitch"), "userSwitch");
  });

  describe("kebabize", () => {
    assertEquals(Helper.kebabize("My    firstName---and"), "my-first-name-and");
  });

  describe("camelize", () => {
    assertEquals(Helper.camelize("My    firstName---and"), "myFirstNameAnd");
  });

  describe("parseString", () => {
    assertEquals(Helper.parseString("42"), 42);
    assertEquals(Helper.parseString("h42"), "h42");
    assertEquals(Helper.parseString("42.42"), 42.42);
    assertEquals(Helper.parseString("42.42.42"), "42.42.42");
    assertEquals(Helper.parseString("[ooneex, 42]"), ["ooneex", 42]);
    assertEquals(Helper.parseString("true"), true);
    assertEquals(Helper.parseString("false"), false);
    assertEquals(Helper.parseString("null"), null);
  });

  describe("randomInt", () => {
    assertEquals(Helper.randomInt(5) <= 5, true);
  });

  describe("randomColor", () => {
    assertEquals(/^#[0-9A-F]{6}/.test(Helper.randomColor()), true);
  });
});
