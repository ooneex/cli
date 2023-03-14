import { Helper, HttpMethodType, HttpProtocolType } from "../deps.ts";
import { IMatchedRoute } from "../Matched/types.ts";
import { IRoute } from "../Route/types.ts";
import { IRouteChecker, RouteCheckerErrorType } from "./types.ts";

export class RouteChecker implements IRouteChecker {
  private errors: RouteCheckerErrorType[] = [];

  constructor(private route: IRoute, private matchedRoute: IMatchedRoute) {
  }

  public check(): this {
    this.checkMethod();
    this.checkIp();
    this.checkLocale();
    this.checkEnv();
    this.checkVersion();
    this.checkHost();
    this.checkProtocol();
    this.checkPort();
    this.checkConstraints();

    return this;
  }

  public isValid(): boolean {
    this.check();

    return this.errors.length === 0;
  }

  public getErrors(): RouteCheckerErrorType[] {
    return this.errors;
  }

  public checkMethod(): true | string {
    const methods = this.route.getMethods();
    if (!methods) {
      return true;
    }

    const method = this.matchedRoute.getMethod() as HttpMethodType;

    if (method && methods.includes(method)) {
      return true;
    }

    const message = `Method ${method} not matched`;

    this.errors.push({
      key: "method",
      message,
    });

    return message;
  }

  public checkIp(): true | string {
    const ips = this.route.getIps();
    if (!ips) {
      return true;
    }

    const ip = this.matchedRoute.getIp();

    if (ip && ips.includes(ip)) {
      return true;
    }

    const message = `IP ${ip} not matched`;

    this.errors.push({
      key: "ip",
      message,
    });

    return message;
  }

  public checkLocale(): true | string {
    const locales = this.route.getLocales();
    if (!locales) {
      return true;
    }

    const locale = this.matchedRoute.getLocale();

    if (locale && locales.includes(locale)) {
      return true;
    }

    const message = `Locale ${locale} not matched`;

    this.errors.push({
      key: "locale",
      message,
    });

    return message;
  }

  public checkEnv(): true | string {
    const envs = this.route.getEnvs();
    if (!envs) {
      return true;
    }

    const env = this.matchedRoute.getEnv();

    if (env && envs.includes(env)) {
      return true;
    }

    const message = `Env ${env} not matched`;

    this.errors.push({
      key: "env",
      message,
    });

    return message;
  }

  public checkVersion(): true | string {
    const versions = this.route.getVersions();
    if (!versions) {
      return true;
    }

    const version = this.matchedRoute.getVersion();

    if (version && versions.includes(version)) {
      return true;
    }

    const message = `Version ${version} not matched`;

    this.errors.push({
      key: "version",
      message,
    });

    return message;
  }

  public checkHost(): true | string {
    const hosts = this.route.getHosts();
    if (!hosts) {
      return true;
    }

    const url = this.matchedRoute.getUrl();
    const host = url.hostname;

    if (host && hosts.includes(host)) {
      return true;
    }

    const message = `Host ${host} not matched`;

    this.errors.push({
      key: "host",
      message,
    });

    return message;
  }

  public checkProtocol(): true | string {
    const protocols = this.route.getProtocols();
    if (!protocols) {
      return true;
    }

    const url = this.matchedRoute.getUrl();
    const protocol = Helper.trim(url.protocol, ":") as HttpProtocolType;

    if (protocol && protocols.includes(protocol)) {
      return true;
    }

    const message = `Protocol ${protocol} not matched`;

    this.errors.push({
      key: "protocol",
      message,
    });

    return message;
  }

  public checkPort(): true | string {
    const ports = this.route.getPorts();
    if (!ports) {
      return true;
    }

    const url = this.matchedRoute.getUrl();
    const port = url.port;

    if (port && ports.includes(port)) {
      return true;
    }

    const message = `Port ${port} not matched`;

    this.errors.push({
      key: "port",
      message,
    });

    return message;
  }

  public checkConstraints(): true | RouteCheckerErrorType[] {
    const constraints = this.route.getConstraints();
    if (!constraints) {
      return true;
    }

    let params = this.matchedRoute.getParams();
    if (!params) {
      params = {};
    }

    const errors: RouteCheckerErrorType[] = [];

    // Check where constraints
    const whereConstraints = constraints.where ?? {};
    Object.keys(whereConstraints).map((key) => {
      if (!Helper.hasProperty(params, key)) {
        errors.push({
          key: "where constraints",
          message: `[where] ${key} param missing`,
        });
        return;
      }
      // @ts-ignore: trust me
      if (`${params[key]}` !== `${whereConstraints[key]}`) {
        errors.push({
          key: "constraints",
          message: `${key} param must be equal to ${whereConstraints[key]}`,
        });
      }
    });

    // Check regex constraints
    const regexConstraints = constraints.regex ?? {};
    Object.keys(regexConstraints).map((key) => {
      if (!Helper.hasProperty(params, key)) {
        errors.push({
          key: "regex constraints",
          message: `${key} param missing`,
        });
        return;
      }

      const reg = new RegExp(regexConstraints[key]);

      // @ts-ignore: trust me
      if (!reg.test(`${params[key]}`)) {
        errors.push({
          key: "regex constraints",
          message: `${key} param must match with "${regexConstraints[key]}"`,
        });
      }
    });

    // Check number constraints
    const numberConstraints = constraints.number ?? [];
    numberConstraints.map((key) => {
      if (!Helper.hasProperty(params, key)) {
        errors.push({
          key: "number constraints",
          message: `${key} param missing`,
        });
        return;
      }

      const reg = /^[0-9]+$/;

      // @ts-ignore: trust me
      if (!reg.test(`${params[key]}`)) {
        errors.push({
          key: "number constraints",
          message: `${key} param must match with "${reg}"`,
        });
      }
    });

    // Check alphaNumeric constraints
    const alphaNumericConstraints = constraints.alphaNumeric ?? [];
    alphaNumericConstraints.map((key) => {
      if (!Helper.hasProperty(params, key)) {
        errors.push({
          key: "alphaNumeric constraints",
          message: `${key} param missing`,
        });
        return;
      }

      const reg = /^[a-z0-9]+$/;

      // @ts-ignore: trust me
      const p = params[key];

      if (
        !reg.test(`${p}`) || !/[a-z]+/.test(`${p}`) ||
        !/[0-9]+/.test(`${p}`)
      ) {
        errors.push({
          key: "alphaNumeric constraints",
          message:
            `${key} param must match with "${/[a-z]+/}" and "${/[0-9]+/}"`,
        });
      }
    });

    // Check in constraints
    const inConstraints = constraints.in ?? {};
    Object.keys(inConstraints).map((key) => {
      if (!Helper.hasProperty(params, key)) {
        errors.push({ key: "in constraints", message: `${key} param missing` });
        return;
      }

      // @ts-ignore: trust me
      if (!inConstraints[key].includes(params[key])) {
        errors.push({
          key: "in constraints",
          message: `${key} param must equal to " ${
            inConstraints[key].join('" or "')
          }"`,
        });
      }
    });

    this.errors = [...this.errors, ...errors];

    return (errors.length === 0) ? true : errors;
  }
}
