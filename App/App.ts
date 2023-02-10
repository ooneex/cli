import { IException } from "../Exception/types.ts";
import { AppStateType } from "./types.ts";

export class App {
  private state: AppStateType | null = null;

  public setState(state: AppStateType): this {
    this.state = state;

    return this;
  }

  public getState(): AppStateType | null {
    return this.state;
  }

  public setError(error: IException): this {
    if (this.state) {
      this.state.error = error;
    }

    return this;
  }

  public hasError(): boolean {
    return this.getError() !== null;
  }

  public getError(): IException | null {
    return this.state?.error ?? null;
  }
}

export const app = new App();
