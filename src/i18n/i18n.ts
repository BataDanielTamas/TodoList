import translations from "./hu.json";

type TranslationKey = keyof typeof translations;
type Params = Record<string, string | number>;

export const t = (key: TranslationKey, params?: Params): string => {
  let str: string = translations[key];
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, String(v));
    });
  }
  return str;
};
