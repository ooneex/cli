export type RouteCheckerErrorType = {
  key: string;
  message: string;
};

export interface IRouteChecker {
  isValid(): boolean;
  getErrors(): RouteCheckerErrorType[];
  checkMethod(): true | string;
  checkProtocol(): true | string;
  checkHost(): true | string;
  checkPort(): true | string;
  checkLocale(): true | string;
  checkEnv(): true | string;
  checkVersion(): true | string;
  checkConstraints(): true | RouteCheckerErrorType[];
}
