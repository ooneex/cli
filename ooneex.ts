import { print } from "./src/deps.ts";
import { Kernel } from "./src/Kernel.ts";

if (import.meta.main) {
  try {
    Kernel.boot();
    Kernel.run();
  } catch (e) {
    print(e);
    Deno.exit(1);
  }
}
