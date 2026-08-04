import type { UIKey } from "@i18n/ui";

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

export type ChangelogEntry = {
    DATE: string;
    TEXT: string;
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
