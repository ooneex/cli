export class Helper {
  public static trim(text: string, char: string): string {
    const reg = new RegExp("^" + char + "+|" + char + "+$", "g");
    return text.replace(reg, "");
  }

  public static hasProperty(object: unknown, key: string): boolean {
    return this.getByKey(object, key) !== undefined;
  }

  public static getByKey<T>(object: unknown, key: string): T | undefined {
    const keys = (key as string).split(".");

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];

      try {
        // @ts-ignore:
        object = object[key];
        if (object === undefined) {
          return undefined;
        }
      } catch {
        return undefined;
      }
    }

    return (object as (T | undefined));
  }

  public static getType(object: unknown): string | null {
    if (object === null) {
      return null;
    }
    let t = typeof object;
    if (t === "object") {
      // @ts-ignore:
      object = String(object.constructor);
      if (/^(?:function|object) ([a-z0-9-]+)\(?/i.test(<string> object)) {
        // FIXME: Fix deprecated notice
        // @ts-ignore:
        t = RegExp.$1;
        if (/^html[a-z]*element$/i.test(t)) {
          // @ts-ignore:
          t = "Element";
        }
      } else {
        // @ts-ignore:
        t = undefined;
      }
    }

    return t;
  }

  public static isObject(object: unknown): boolean {
    return Helper.getType(object) === "Object";
  }

  public static isNumber(object: unknown): boolean {
    return Helper.getType(object) === "number";
  }

  public static isBoolean(object: unknown): boolean {
    return Helper.getType(object) === "boolean";
  }

  public static isEmpty(object: unknown): boolean {
    if (!object) {
      return true;
    }

    // @ts-ignore:
    for (const k in object) {
      // @ts-ignore:
      if (Object.prototype.hasOwnProperty.call(object, k)) {
        return false;
      }
    }

    return !((object === true) || Helper.isNumber(object));
  }

  public static isArray(object: unknown): boolean {
    return Helper.getType(object) === "Array";
  }

  public static isString(object: unknown): boolean {
    return Helper.getType(object) === "string";
  }

  public static isRegExp(object: unknown): boolean {
    return Helper.getType(object) === "RegExp";
  }

  /**
   * Checks if an object is a DOM element.
   */
  public static isElement(object: unknown): boolean {
    return Helper.getType(object) === "Element";
  }

  public static isFunction(object: unknown): boolean {
    return Helper.getType(object) === "function";
  }

  public static isFormData(object: unknown): boolean {
    return Helper.getType(object) === "FormData";
  }

  public static isNull(object: unknown): boolean {
    return object === null;
  }

  public static isFalse(object: unknown): boolean {
    return object === false;
  }

  public static isTrue(object: unknown): boolean {
    return object === true;
  }

  public static isBlank(object: unknown): boolean {
    return Helper.isString(object) && (object as string).trim() === "";
  }

  public static randomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public static randomColor(): string {
    return "#" + ("0123456789abcdef".split("").map((_v, i, a) => {
      return i > 5 ? null : a[Math.floor(Math.random() * 16)];
    }).join("")).toUpperCase();
  }

  public static ucFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  public static lcFirst(text: string): string {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }

  public static parseString(text: string): unknown {
    if (/^[0-9]+$/.test(text)) {
      return parseInt(text, 10);
    }

    if (/^[0-9]+\.[0-9]+$/.test(text)) {
      return parseFloat(text);
    }

    if (/^true$/i.test(text)) {
      return true;
    }

    if (/^false$/i.test(text)) {
      return false;
    }

    if (/^null$/i.test(text)) {
      return null;
    }

    if (/^\[/.test(text) && /]$/.test(text)) {
      text = Helper.trim(text, "\\[|\\]");

      const values: unknown[] = text.split(",");

      values.map((value, index) => {
        values[index] = Helper.parseString(value as string);
      });

      return values;
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  /**
   * Converts text to slug.
   *
   * @param text - The string to convert.
   */
  public static kebabize(text: string): string {
    return text
      .replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, "-$1")
      .toLowerCase()
      .replace(/ +/g, "-")
      .replace(/[\-]{2}/g, "");
  }

  /**
   * Converts text to camelCase.
   *
   * @param text - The string to convert.
   */
  public static camelize(text: string): string {
    return Helper.kebabize(text)
      .replace(/\s(.)/g, ($1) => $1.toUpperCase())
      .replace(/-(.)/g, ($1) => $1.toUpperCase())
      .replace(/\s/g, "").replace(/-/g, "");
  }
}
