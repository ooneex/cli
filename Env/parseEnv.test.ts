import { assertEquals } from "@ooneex/testing/asserts.ts";
import { it } from "@ooneex/testing/bdd.ts";
import { DotEnvValueType, parseEnv } from "./mod.ts";

const content = `# dev | prod | test | demo
ENV=dev
LOCALE=en-us
COUNTRY="United States"
# api | react
TYPE=react
VERSION=1.0.0
SECRET=ed0c2fdc-35e4-49af-9816-bd4daaee9e95
# Allowed hosts
HOSTS=["localhost"]
# Allowed ips
IP=["127.0.0.1"]
# Allowed protocols
PROTOCOLS=["http","https","socket","tcp"]
DDD=false
DEBUG=true
PORT=9000

MAILER_DSN=smtp://my-host=*
MIN_AGE=18
MIN_PRICE=42.42
IS_LEGAL=True
IS_MINOR=False
`;

it("Env - parse", () => {
  const data: Record<string, DotEnvValueType> = parseEnv(content);

  assertEquals(data["NO_KEY"], undefined, "No key found");
  assertEquals(data["MIN_AGE"], 18, "Get int value");
  assertEquals(data["MIN_PRICE"], 42.42, "Get float value");
  assertEquals(data["IS_LEGAL"], true, "Get true value");
  assertEquals(data["IS_MINOR"], false, "Get false value");
  assertEquals(data["ENV"], "dev", "Get simple text");
  assertEquals(
    data["MAILER_DSN"],
    "smtp://my-host=*",
    "Get complex text",
  );
  assertEquals(
    Object.keys(data),
    [
      "ENV",
      "LOCALE",
      "COUNTRY",
      "TYPE",
      "VERSION",
      "SECRET",
      "HOSTS",
      "IP",
      "PROTOCOLS",
      "DDD",
      "DEBUG",
      "PORT",
      "MAILER_DSN",
      "MIN_AGE",
      "MIN_PRICE",
      "IS_LEGAL",
      "IS_MINOR",
    ],
  );
});
