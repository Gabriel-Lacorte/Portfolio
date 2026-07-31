import type {
    ChangelogEntry,
    LabBox,
    ReadingItem,
    Metadata,
    NavItem,
    Project,
    Site,
    Socials,
    StackGroup,
    UsesGroup,
} from "@types";

export const SITE: Site = {
    TITLE: "Gabriel Lacorte",
    HANDLE: "lacorte.city",
    DESIGNATION: "lacorte.city — systems engineering notebook",
    ROLE: "systems engineer",
    DESCRIPTION:
        "Systems engineering notebook — hypervisors, compilers, operating systems, and the protocols that hold them together.",
    EMAIL: "gabriellacorte@posteo.com",
    LOCATION: "Brazil",
};

/* Labels come from the UI dictionary, so the menu translates with
   everything else instead of being pinned to English here. */
export const NAV_KEYS: NavItem[] = [
    { KEY: "nav.home", HREF: "/" },
    { KEY: "nav.blog", HREF: "/blog" },
    { KEY: "nav.projects", HREF: "/projects" },
    { KEY: "nav.uses", HREF: "/uses" },
    { KEY: "nav.now", HREF: "/now" },
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

/* What he works with. Deliberately a flat list — a self-assessed
   proficiency scale is a claim nobody can check and it read as posturing.
   Grouped only so the column stays scannable. */
export const STACK_GROUPS: StackGroup[] = [
    {
        GROUP: "languages",
        ITEMS: ["C", "C++", "Go", "Python", "JavaScript", "SQL", "Bash"],
    },
    {
        GROUP: "systems",
        ITEMS: ["Linux", "syscalls", "ELF", "KVM / VMX", "paging", "ESXi"],
    },
    {
        GROUP: "backend",
        ITEMS: ["Flask", "FastAPI", "Gin", "Node.js", "Express", "PostgreSQL", "Prisma"],
    },
    {
        GROUP: "infrastructure",
        ITEMS: ["Docker", "nginx", "Cloudflare", "CI/CD", "git", "self-hosting"],
    },
    {
        GROUP: "security",
        ITEMS: ["Active Directory", "Kerberos", "reverse engineering", "malware analysis", "Yara"],
    },
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
            "Issues and validates software licence keys over a documented REST API.",
        STACK: ["Python", "Flask", "SQLite", "REST", "Swagger"],
        HREF: "https://github.com/Gabriel-Lacorte/LicenseManager",
        YEAR: "2024",
    },
    {
        NAME: "homelab",
        SUMMARY:
            "Debian server built from two salvaged machines — containerised services behind a Cloudflare tunnel with Zero Trust in front.",
        STACK: ["Debian", "Docker", "Cloudflare", "nginx"],
        HREF: "/blog/home-server-guide",
        YEAR: "2024",
    },
];

/* TODO(gabriel): scaffold — swap in your real setup. The em-dashes are
   placeholders and render muted, so the gaps stay obvious. */
export const USES: UsesGroup[] = [
    {
        GROUP: "workstation",
        ROWS: [
            { k: "editor", v: "—" },
            { k: "shell", v: "—" },
            { k: "terminal", v: "—" },
            { k: "multiplexer", v: "—" },
            { k: "machine", v: "—" },
            { k: "os", v: "—" },
        ],
    },
    {
        GROUP: "homelab",
        ROWS: [
            { k: "host", v: "Debian 12 · salvaged parts" },
            { k: "runtime", v: "Docker" },
            { k: "ingress", v: "Cloudflare Tunnel · Zero Trust" },
            { k: "writeup", v: "/blog/home-server-guide" },
        ],
    },
    {
        GROUP: "this site",
        ROWS: [
            { k: "framework", v: "Astro · static" },
            { k: "type", v: "Iosevka · Departure Mono" },
            { k: "licence", v: "SIL OFL 1.1" },
            { k: "hosting", v: "—" },
        ],
    },
];

/* Newest first. One line each — a ship log, not release notes. */
export const CHANGELOG: ChangelogEntry[] = [
    { DATE: "2026-07-31", TEXT: "Rebuilt the site from scratch." },
    {
        DATE: "2024-12-24",
        TEXT: "New post: static analysis of RansomHub's ESXi locker.",
    },
    {
        DATE: "2024-06-01",
        TEXT: "New post: a home server out of salvaged parts.",
    },
    {
        DATE: "2024-05-04",
        TEXT: "New post: attacking Kerberos in Active Directory.",
    },
];

/* The homelab, from the machine itself. Real numbers out of the
   home-server post; update them when the box changes.
   TODO(gabriel): confirm the specs and add anything you have since put
   in there. */
export const LAB: LabBox[] = [
    {
        NAME: "nyx",
        ROLE: "web · docker host",
        SPEC: "2x salvaged desktops · 8GB DDR3",
        OS: "Debian 12",
        STATE: "up",
    },
    {
        NAME: "cloudflared",
        ROLE: "ingress tunnel",
        SPEC: "outbound only · no open port",
        OS: "container",
        STATE: "up",
    },
    {
        NAME: "nginx",
        ROLE: "reverse proxy",
        SPEC: ":80 behind the tunnel",
        OS: "container",
        STATE: "up",
    },
];

/* TODO(gabriel): this is the one part I cannot invent for you — put the
   books and papers you are actually on. */
export const READING: ReadingItem[] = [
    { TITLE: "Intel SDM, vol. 3", NOTE: "VMX chapters, slowly", STATE: "now" },
    { TITLE: "—", NOTE: "add yours", STATE: "queued" },
    { TITLE: "—", NOTE: "add yours", STATE: "queued" },
];

/* TODO(gabriel): a /now page is only worth having if it is current.
   Update the date whenever you change the lines. */
export const NOW = {
    UPDATED: "2026-07-31",
    LINES: [
        "Reading the Intel SDM volume 3 chapters on VMX, slowly.",
        "Writing a small compiler back end to understand register allocation properly.",
        "Rebuilding this site.",
    ],
};

export const SOCIALS: Socials = [
    {
        NAME: "github",
        HANDLE: "Gabriel-Lacorte",
        HREF: "https://github.com/Gabriel-Lacorte",
    },
    {
        NAME: "linkedin",
        HANDLE: "gabriel-lacorte-dev",
        HREF: "https://www.linkedin.com/in/gabriel-lacorte-dev/",
    },
];
