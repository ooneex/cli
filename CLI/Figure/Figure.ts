import { figures } from "./deps.ts";
import { IFigure } from "./mod.ts";

/**
 * Figure
 * This class allows you to display figures in the terminal.
 *
 * @example
 *
 *  ```ts
 *  const figure = new Figure();
 *  console.log(figure.cross());
 *  console.log(figure.arrowRight());
 *  ```
 */
export class Figure implements IFigure {
  /**
   * @inheritDoc IFigure.tick
   */
  public tick(): string {
    return figures.tick;
  }

  /**
   * @inheritDoc IFigure.arrowDown
   */
  public arrowDown(): string {
    return figures.arrowDown;
  }

  /**
   * @inheritDoc IFigure.arrowLeft
   */
  public arrowLeft(): string {
    return figures.arrowLeft;
  }

  /**
   * @inheritDoc IFigure.arrowRight
   */
  public arrowRight(): string {
    return figures.arrowRight;
  }

  /**
   * @inheritDoc IFigure.arrowUp
   */
  public arrowUp(): string {
    return figures.arrowUp;
  }

  /**
   * @inheritDoc IFigure.bullet
   */
  public bullet(): string {
    return figures.bullet;
  }

  /**
   * @inheritDoc IFigure.checkboxOff
   */
  public checkboxOff(): string {
    return figures.checkboxOff;
  }

  /**
   * @inheritDoc IFigure.checkboxOn
   */
  public checkboxOn(): string {
    return figures.checkboxOn;
  }

  /**
   * @inheritDoc IFigure.circle
   */
  public circle(): string {
    return figures.circle;
  }

  /**
   * @inheritDoc IFigure.circleFilled
   */
  public circleFilled(): string {
    return figures.circleFilled;
  }

  /**
   * @inheritDoc IFigure.cross
   */
  public cross(): string {
    return figures.cross;
  }

  /**
   * @inheritDoc IFigure.ellipsis
   */
  public ellipsis(): string {
    return figures.ellipsis;
  }

  /**
   * @inheritDoc IFigure.hamburger
   */
  public hamburger(): string {
    return figures.hamburger;
  }

  /**
   * @inheritDoc IFigure.heart
   */
  public heart(): string {
    return figures.heart;
  }

  /**
   * @inheritDoc IFigure.info
   */
  public info(): string {
    return figures.info;
  }

  /**
   * @inheritDoc IFigure.play
   */
  public play(): string {
    return figures.play;
  }

  /**
   * @inheritDoc IFigure.radioOff
   */
  public radioOff(): string {
    return figures.radioOff;
  }

  /**
   * @inheritDoc IFigure.radioOn
   */
  public radioOn(): string {
    return figures.radioOn;
  }

  /**
   * @inheritDoc IFigure.square
   */
  public square(): string {
    return figures.squareSmall;
  }

  /**
   * @inheritDoc IFigure.squareFilled
   */
  public squareFilled(): string {
    return figures.squareSmallFilled;
  }

  /**
   * @inheritDoc IFigure.star
   */
  public star(): string {
    return figures.star;
  }

  /**
   * @inheritDoc IFigure.warning
   */
  public warning(): string {
    return figures.warning;
  }
}
