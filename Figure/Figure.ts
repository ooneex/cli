import { figures } from "./deps.ts";

/**
 * Figure
 * This class allows you to display figures in the terminal.
 *
 * @example
 *
 *  ```ts
 *  console.log(Figure.cross());
 *  console.log(Figure.arrowRight());
 *  ```
 */
export class Figure {
  /**
   * Write tick: ✔
   */
  public static tick(): string {
    return figures.tick;
  }

  /**
   * Write arrowDown: ↓
   */
  public static arrowDown(): string {
    return figures.arrowDown;
  }

  /**
   * Write arrowLeft: ←
   */
  public static arrowLeft(): string {
    return figures.arrowLeft;
  }

  /**
   * Write arrowRight: →
   */
  public static arrowRight(): string {
    return figures.arrowRight;
  }

  /**
   * Write arrowUp: ↑
   */
  public static arrowUp(): string {
    return figures.arrowUp;
  }

  /**
   * Write bullet: ●
   */
  public static bullet(): string {
    return figures.bullet;
  }

  /**
   * Write checkboxOff: ☐
   */
  public static checkboxOff(): string {
    return figures.checkboxOff;
  }

  /**
   * Write checkboxOn: ☒
   */
  public static checkboxOn(): string {
    return figures.checkboxOn;
  }

  /**
   * Write circle: ◯
   */
  public static circle(): string {
    return figures.circle;
  }

  /**
   * Write circleFilled: ◉
   */
  public static circleFilled(): string {
    return figures.circleFilled;
  }

  /**
   * Write cross: ✖
   */
  public static cross(): string {
    return figures.cross;
  }

  /**
   * Write ellipsis: …
   */
  public static ellipsis(): string {
    return figures.ellipsis;
  }

  /**
   * Write hamburger: ☰
   */
  public static hamburger(): string {
    return figures.hamburger;
  }

  /**
   * Write heart: ♥
   */
  public static heart(): string {
    return figures.heart;
  }

  /**
   * Write info: ℹ
   */
  public static info(): string {
    return figures.info;
  }

  /**
   * Write play: ▶
   */
  public static play(): string {
    return figures.play;
  }

  /**
   * Write radioOff: ◯
   */
  public static radioOff(): string {
    return figures.radioOff;
  }

  /**
   * Write radioOn: ◉
   */
  public static radioOn(): string {
    return figures.radioOn;
  }

  /**
   * Write square: ◻
   */
  public static square(): string {
    return figures.squareSmall;
  }

  /**
   * Write squareFilled: ◼
   */
  public static squareFilled(): string {
    return figures.squareSmallFilled;
  }

  /**
   * Write star: ★
   */
  public static star(): string {
    return figures.star;
  }

  /**
   * Write warning: ⚠
   */
  public static warning(): string {
    return figures.warning;
  }
}
