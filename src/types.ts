import type { Locale, UIKey } from "@i18n/ui";

export type Site = {
    TITLE: string;
    HANDLE: string;
    DESIGNATION: string;
    ROLE: string;
    DESCRIPTION: string;
    EMAIL: string;
    LOCATION: string;
};

export type Metadata = {
    TITLE: string;
    DESCRIPTION: string;
};

export type NavItem = {
    KEY: UIKey;
    HREF: string;
};

export type ReadingItem = {
    TITLE: string;
    NOTE: string;
    STATE: "now" | "queued" | "done";
};

export type StackGroup = {
    GROUP: string;
    ITEMS: string[];
};

export type Project = {
    NAME: string;
    SUMMARY: string;
    STACK: string[];
    HREF: string;
    YEAR: string;
};

/* One entry per locale rather than one string: the changelog is prose on the
   front page of both sites, so a missing translation has to fail the build. */
export type ChangelogEntry = {
    DATE: string;
    TEXT: Record<Locale, string>;
};

export type UsesGroup = {
    GROUP: string;
    ROWS: { k: string; v: string }[];
};

export type Socials = {
    NAME: string;
    HANDLE: string;
    HREF: string;
}[];

export type Badge = {
    SRC: string;
    W: number;
    H: number;
    ALT: string;
    /** Set when the artwork's own language is not the page's. */
    LANG?: string;
    /** Still frame served under prefers-reduced-motion, for animated badges. */
    STILL?: string;
    /** Where the badge points, for the ones that point anywhere. */
    HREF?: string;
};
