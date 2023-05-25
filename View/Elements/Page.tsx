import { EnvHelper, get, Keys } from "../deps.ts";

// @ts-ignore: trust me
export const Page = (props: HTMLAttributes<HTMLHtmlElement>) => {
  const envHelper = get<EnvHelper>(Keys.Env.Helper);
  const { lang = envHelper.getLocale(), children } = props;
  delete props.children;

  return (
    <html {...props} lang={lang}>
      {children}
    </html>
  );
};
