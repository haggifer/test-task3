export const getURLParamsObject = (url: string): Record<string, string | undefined> => {
  const searchParams = new URLSearchParams(url);

  const paramsObject: Record<string, string | undefined> = {};

  for (const [key, value] of searchParams) {
    paramsObject[key] = value === '' ? undefined : value as string;
  }

  return paramsObject;
};