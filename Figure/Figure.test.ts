import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { figures } from "./deps.ts";
import { Figure } from "./mod.ts";

describe("Figure", () => {
  const methods: string[] = Object.getOwnPropertyNames(Figure.prototype);

  methods.map((method) => {
    if (method === "constructor") {
      return method;
    }

    it(method, () => {
      if (method === "square") {
        assertEquals(figures.squareSmall, Figure.square());
      } else if (method === "squareFilled") {
        assertEquals(
          figures.squareSmallFilled,
          Figure.squareFilled(),
        );
      } else {
        // @ts-ignore:
        assertEquals(figures[method], consoleFigure[method]());
      }
    });

    return method;
  });
});
