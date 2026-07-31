export type Site = {
    TITLE: string;
    HANDLE: string;
    ROLE: string;
    TAGLINE: string;
    DESCRIPTION: string;
    EMAIL: string;
};

export type Metadata = {
    TITLE: string;
    DESCRIPTION: string;
};

export type NavItem = {
    LABEL: string;
    HREF: string;
};

export type Focus = {
    AREA: string;
    ITEMS: string;
};

export type Project = {
    NAME: string;
    SUMMARY: string;
    STACK: string[];
    HREF: string;
    YEAR: string;
};

export type StackLayer = {
    RING: string;
    NAME: string;
    /** Block character the density bar is drawn from. */
    FILL: string;
    DETAIL: string;
    /** Marks the layer this site is about. */
    HERE?: boolean;
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
