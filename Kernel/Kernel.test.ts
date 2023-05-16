import { LogType } from "./deps.ts";
import "./mod.ts";

declare global {
  interface Window {
    Log: LogType;
  }
}
