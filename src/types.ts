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

/** A row on the capability sheet: what it is, and how far along it is. */
export type Capability = {
    NAME: string;
    /** FLUENT = ship it daily · FIELD = used in anger · ACTIVE = in hand
     *  · STUDY = deliberately learning. Kept honest on purpose. */
    STATUS: "FLUENT" | "FIELD" | "ACTIVE" | "STUDY";
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
