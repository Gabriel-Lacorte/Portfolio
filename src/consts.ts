import type {
    Focus,
    Metadata,
    NavItem,
    Project,
    Site,
    Socials,
    StackLayer,
    UsesGroup,
} from "@types";

export const SITE: Site = {
    TITLE: "Gabriel Lacorte",
    HANDLE: "lacorte.city",
    ROLE: "systems engineer",
    TAGLINE: "systems · compilers · operating systems",
    DESCRIPTION:
        "Systems engineer working below the abstraction line — hypervisors, compilers, operating systems, and the protocols that hold them together.",
    EMAIL: "gabriellacorte@posteo.com",
};

export const NAV: NavItem[] = [
    { LABEL: "~/", HREF: "/" },
    { LABEL: "~/blog", HREF: "/blog" },
    { LABEL: "~/projects", HREF: "/projects" },
    { LABEL: "~/uses", HREF: "/uses" },
    { LABEL: "~/now", HREF: "/now" },
];

export const HOME: Metadata = {
    TITLE: "Home",
    DESCRIPTION:
        "Systems engineer — hypervisors, compilers, and operating systems.",
};

export const BLOG: Metadata = {
    TITLE: "Blog",
    DESCRIPTION: "Notes on systems, compilers, and low-level engineering.",
};

export const PROJECTS_META: Metadata = {
    TITLE: "Projects",
    DESCRIPTION: "Things I have built.",
};

/* Replaces the old SKILLS list. Framework names undersell the work —
   these are the layers, not the logos. */
export const FOCUS: Focus[] = [
    {
        AREA: "systems",
        ITEMS: "hypervisors · KVM/VMX · paging · ELF · syscalls",
    },
    {
        AREA: "languages",
        ITEMS: "compilers · IR · codegen · Go · C · Python",
    },
    {
        AREA: "infra",
        ITEMS: "Linux · Docker · networking · self-hosting",
    },
    {
        AREA: "security",
        ITEMS: "Active Directory · Kerberos · reverse engineering",
    },
];

/* The privilege stack, home-page centrepiece. `HERE` marks the layer
   this site is actually about. */
export const STACK: StackLayer[] = [
    {
        RING: "ring 3",
        NAME: "userland",
        FILL: "░",
        DETAIL: "applications · libc",
    },
    {
        RING: "ring 0",
        NAME: "kernel",
        FILL: "▒",
        DETAIL: "scheduler · mm · drivers",
    },
    {
        RING: "ring -1",
        NAME: "hypervisor",
        FILL: "▓",
        DETAIL: "VMX root · EPT · VM exits",
        HERE: true,
    },
    { RING: "ring -2", NAME: "SMM", FILL: "█", DETAIL: "firmware" },
];

/* TODO(gabriel): review — carried over from lacorte.neocities.org and the
   home-server post. Add, drop, or rewrite as you like. */
export const PROJECTS: Project[] = [
    {
        NAME: "notio",
        SUMMARY: "API for fast note sharing — create a note, hand over a link.",
        STACK: ["Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
        HREF: "https://github.com/Gabriel-Lacorte/Notio",
        YEAR: "2024",
    },
    {
        NAME: "license-manager",
        SUMMARY:
            "Web application for issuing and validating software licence keys, over a documented REST API.",
        STACK: ["Python", "Flask", "SQLite", "REST", "Swagger"],
        HREF: "https://github.com/Gabriel-Lacorte/LicenseManager",
        YEAR: "2024",
    },
    {
        NAME: "homelab",
        SUMMARY:
            "Debian server built from two salvaged machines — containerised services, exposed through a Cloudflare tunnel with Zero Trust in front.",
        STACK: ["Debian", "Docker", "Cloudflare", "nginx"],
        HREF: "/blog/01-home-server-guide",
        YEAR: "2024",
    },
];

/* TODO(gabriel): this is a scaffold — swap in your real setup. The format
   is deliberately boring to maintain: a heading, then label/value rows. */
export const USES: UsesGroup[] = [
    {
        GROUP: "editor",
        ROWS: [
            { k: "editor", v: "—" },
            { k: "shell", v: "—" },
            { k: "terminal", v: "—" },
            { k: "multiplexer", v: "—" },
        ],
    },
    {
        GROUP: "machine",
        ROWS: [
            { k: "laptop", v: "—" },
            { k: "os", v: "—" },
            { k: "keyboard", v: "—" },
        ],
    },
    {
        GROUP: "homelab",
        ROWS: [
            { k: "host", v: "Debian 12, two salvaged machines" },
            { k: "runtime", v: "Docker" },
            { k: "ingress", v: "Cloudflare Tunnel + Zero Trust" },
            { k: "writeup", v: "/blog/01-home-server-guide" },
        ],
    },
    {
        GROUP: "this site",
        ROWS: [
            { k: "framework", v: "Astro, static output" },
            { k: "type", v: "Iosevka + Departure Mono (OFL 1.1)" },
            { k: "hosting", v: "—" },
            { k: "source", v: "github.com/Gabriel-Lacorte" },
        ],
    },
];

/* TODO(gabriel): a /now page is only worth having if it is current. Update
   the date whenever you change the lines below. */
export const NOW = {
    UPDATED: "2026-07-31",
    LINES: [
        "Reading the Intel SDM volume 3 chapters on VMX, slowly.",
        "Writing a small compiler back end to understand register allocation properly.",
        "Rebuilding this site.",
    ],
};

export const SOCIALS: Socials = [
    { NAME: "github", HANDLE: "Gabriel-Lacorte", HREF: "https://github.com/Gabriel-Lacorte" },
    {
        NAME: "linkedin",
        HANDLE: "gabriel-lacorte-dev",
        HREF: "https://www.linkedin.com/in/gabriel-lacorte-dev/",
    },
];
