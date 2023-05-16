import { LogType } from "./deps.ts";

declare global {
  interface Window {
    Log: LogType;
  }
}
