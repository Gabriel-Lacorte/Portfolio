import {
    DEFAULT_LOCALE,
    LOCALES,
    UI,
    type Locale,
    type UIKey,
} from "./ui";

export function getLocale(url: URL): Locale {
    const first = url.pathname.split("/").filter(Boolean)[0];
    return LOCALES.includes(first as Locale)
        ? (first as Locale)
        : DEFAULT_LOCALE;
}

export function localised(path: string, locale: Locale): string {
    const clean = path.startsWith("/") ? path : `/${path}`;
    if (locale === DEFAULT_LOCALE) return clean;
    return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export function unlocalised(pathname: string): string {
    const parts = pathname.split("/").filter(Boolean);
    if (LOCALES.includes(parts[0] as Locale) && parts[0] !== DEFAULT_LOCALE) {
        parts.shift();
    }
    return `/${parts.join("/")}`.replace(/\/+$/, "") || "/";
}

export function useTranslations(locale: Locale) {
    return function t(key: UIKey): string {
        return UI[locale][key];
    };
}

export { DEFAULT_LOCALE, LOCALES };
export type { Locale, UIKey };
