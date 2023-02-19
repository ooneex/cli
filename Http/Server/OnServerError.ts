import { IApp } from "../deps.ts";

export const OnServerError = (
  error: unknown,
  app: IApp,
): Response | Promise<Response> => {
  //@ts-ignore:
  const response = new Response(
    `Server error from OnServerError ${(error as Error).message}`,
    { status: 500 },
  );

  return response;
};
