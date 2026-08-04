import {
    DEFAULT_LOCALE,
    LOCALES,
    UI,
    type Locale,
    type UIKey,
} from "./ui";

/**
 * Routing shape: the default locale is unprefixed and every other locale
 * sits under its own segment.
 *
 *   /blog/kerberos-attacks        -> en
 *   /pt-br/blog/kerberos-attacks  -> pt-br
 */

export function getLocale(url: URL): Locale {
    const first = url.pathname.split("/").filter(Boolean)[0];
    return LOCALES.includes(first as Locale)
        ? (first as Locale)
        : DEFAULT_LOCALE;
}

/** Prefixes a root-relative path for the given locale. */
export function localised(path: string, locale: Locale): string {
    const clean = path.startsWith("/") ? path : `/${path}`;
    if (locale === DEFAULT_LOCALE) return clean;
    return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Strips the locale segment, giving the path as the default locale sees it. */
export function unlocalised(pathname: string): string {
    const parts = pathname.split("/").filter(Boolean);
    if (LOCALES.includes(parts[0] as Locale) && parts[0] !== DEFAULT_LOCALE) {
        parts.shift();
    }
    return `/${parts.join("/")}`.replace(/\/+$/, "") || "/";
}

/**
 * Returns a lookup bound to one locale. Keys are typed against the English
 * dictionary, so a typo or a missing translation fails the build instead
 * of leaving an English word inside a Portuguese page.
 */
export function useTranslations(locale: Locale) {
    return function t(key: UIKey): string {
        return UI[locale][key];
    };
}

export { DEFAULT_LOCALE, LOCALES };
export type { Locale, UIKey };
