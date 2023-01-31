import { assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { figures } from "./deps.ts";
import { Figure } from "./mod.ts";

describe("Figure", () => {
  const methods: string[] = Object.getOwnPropertyNames(Figure.prototype);
  const consoleFigure = new Figure();

  methods.map((method) => {
    if (method === "constructor") {
      return method;
    }

    it(method, () => {
      if (method === "square") {
        assertEquals(figures.squareSmall, consoleFigure.square());
      } else if (method === "squareFilled") {
        assertEquals(
          figures.squareSmallFilled,
          consoleFigure.squareFilled(),
        );
      } else {
        // @ts-ignore:
        assertEquals(figures[method], consoleFigure[method]());
      }
    });

    return method;
  });
});
