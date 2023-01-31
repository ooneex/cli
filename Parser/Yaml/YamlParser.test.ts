import { assertArrayIncludes, assertEquals } from "@ooneex/testing/asserts.ts";
import { describe, it } from "@ooneex/testing/bdd.ts";
import { YamlParser } from "./YamlParser.ts";

const yamlData = {
  doe: "a deer, a female deer",
  ray: "a drop of golden sun",
  pi: 3.14159,
  xmas: true,
  "french-hens": 3,
  "calling-birds": ["huey", "dewey", "louie", "fred"],
  "xmas-fifth-day": {
    "calling-birds": "four",
    "french-hens": 3,
    "golden-rings": 5,
    partridges: { count: 1, location: "a pear tree" },
    "turtle-doves": "two",
  },
};

const fileContent = `
# This is a full line comment
doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
  - huey
  - dewey
  - louie
  - fred
xmas-fifth-day:
  calling-birds: four
  french-hens: 3
  golden-rings: 5
  partridges:
    count: 1
    location: "a pear tree"
  turtle-doves: two
`;

describe("Yaml Parser", () => {
  const yaml = new YamlParser(fileContent);
  it("All data", () => {
    assertEquals(yaml.getData(), yamlData);
  });
  it("Some data", () => {
    assertEquals(yaml.get("price"), undefined);
    assertEquals(yaml.get("pi"), 3.14159);
    assertEquals(yaml.get("ray"), "a drop of golden sun");
    assertEquals(yaml.get("xmas-fifth-day.calling-birds"), "four");
    assertEquals(yaml.get("xmas-fifth-day.french-hens"), 3);
    assertEquals(yaml.get("xmas-fifth-day.partridges.count"), 1);
    assertArrayIncludes(yaml.get("calling-birds") as string[], [
      "huey",
      "dewey",
      "louie",
      "fred",
    ]);
  });
});
