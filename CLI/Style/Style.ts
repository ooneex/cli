import { colors } from "./deps.ts";
import { ColorType, IStyle, ModifierType } from "./mod.ts";

/**
 * Style
 * This class allows you to style terminal output.
 *
 * @example
 *
 * ```ts
 *  const style = new Style();
 *
 *  style.bold().underline().color('blue');
 *  console.log(style.render('hello'));
 *  style.reset();
 *  style.color('white', true).bgc('blue');
 *  console.log(style.render('hello'));
 * ```
 */
export class Style implements IStyle {
  private modifier: ModifierType[] = [];
  private fontColor: ColorType | null = null;
  private fontColorLight = false;
  private bgColor: ColorType | null = null;
  private bgColorLight = false;

  /**
   * @inheritDoc IStyle.render
   */
  public render(text: string): string {
    this.modifier.map((modifier) => {
      text = colors[modifier](text);
    });

    if (this.fontColor) {
      const color = this.fontColor;
      const fontColor = this.fontColorLight
        ? "bright" + color.charAt(0).toUpperCase() + color.slice(1)
        : color;
      // @ts-ignore:
      text = colors[fontColor](text);
    }

    if (this.bgColor) {
      const color = this.bgColor.charAt(0).toUpperCase() +
        this.bgColor.slice(1);
      const fontColor = this.bgColorLight ? "bgBright" + color : "bg" + color;

      // @ts-ignore:
      text = colors[fontColor](text);
    }

    return text;
  }

  /**
   * @inheritDoc IStyle.reset
   */
  public reset(): this {
    this.modifier = [];
    this.fontColor = null;
    this.fontColorLight = false;
    this.bgColor = null;
    this.bgColorLight = false;

    return this;
  }

  /**
   * @inheritDoc IStyle.bgc
   */
  public bgc(color: ColorType | null, light = false): this {
    this.bgColor = color;
    this.bgColorLight = light;

    return this;
  }

  /**
   * @inheritDoc IStyle.color
   */
  public color(color: ColorType | null, light = false): this {
    this.fontColor = color;
    this.fontColorLight = light;

    return this;
  }

  /**
   * @inheritDoc IStyle.bold
   */
  public bold(): this {
    this.setModifier("bold");

    return this;
  }

  /**
   * @inheritDoc IStyle.dim
   */
  public dim(): this {
    this.setModifier("dim");

    return this;
  }

  /**
   * @inheritDoc IStyle.hidden
   */
  public hidden(): this {
    this.setModifier("hidden");

    return this;
  }

  /**
   * @inheritDoc IStyle.inverse
   */
  public inverse(): this {
    this.setModifier("inverse");

    return this;
  }

  /**
   * @inheritDoc IStyle.italic
   */
  public italic(): this {
    this.setModifier("italic");

    return this;
  }

  /**
   * @inheritDoc IStyle.underline
   */
  public underline(): this {
    this.setModifier("underline");

    return this;
  }

  /**
   * @inheritDoc IStyle.strikethrough
   */
  public strikethrough(): this {
    this.setModifier("strikethrough");

    return this;
  }

  private setModifier(modifier: ModifierType): this {
    this.modifier.push(modifier);

    return this;
  }
}
