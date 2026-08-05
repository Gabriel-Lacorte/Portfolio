import type {
    Badge,
    ChangelogEntry,
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
    DESIGNATION: "lacorte.city",
    ROLE: "systems engineer",
    DESCRIPTION:
        "Systems engineer, compiler enthusiast, and low-level tinkerer. I write about systems, compilers, and low-level engineering.",
    EMAIL: "gabriellacorte@posteo.com",
    LOCATION: "Brazil",
};

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
        "Systems engineer, compiler enthusiast, and low-level tinkerer. I write about systems, compilers, and low-level engineering.",
};

export const BLOG: Metadata = {
    TITLE: "Blog",
    DESCRIPTION: "Notes on systems, compilers, and low-level engineering.",
};

export const PROJECTS_META: Metadata = {
    TITLE: "Projects",
    DESCRIPTION: "Things I have built.",
};

/* Building comes first, because that is the day job; security follows it
   rather than trailing at the end, because it is the other half. Every item
   is backed by something shipped: the systems row by the projects' own
   sources, Active Directory and reverse engineering by the posts, Windows
   kernel and side channels by CVE-2025-7771 and prefetch-bleed. */
export const STACK_GROUPS: StackGroup[] = [
    {
        GROUP: "systems",
        ITEMS: ["C++", "Rust", "x86 assembly"],
    },
    {
        GROUP: "backend",
        ITEMS: ["Python (Flask, FastAPI)", "Go (Gin, Fiber)", "Node.js (Express, NestJS)"],
    },
    {
        GROUP: "security",
        ITEMS: [
            "Active Directory",
            "Windows kernel",
            "Reverse engineering",
            "Side channels",
        ],
    },
    {
        GROUP: "frontend",
        ITEMS: ["React", "Svelte", "Astro"],
    },
    {
        GROUP: "devops",
        ITEMS: ["Docker", "Nginx", "Cloudflare Tunnel"],
    },
];

export const PROJECTS: Project[] = [
    {
        NAME: "prefetch-bleed",
        SUMMARY:
            "Breaks Windows KASLR through the prefetch side-channel, times PREFETCHNTA against kernel addresses to find the kernel base.",
        STACK: ["C++", "x86 Assembly", "CMake"],
        HREF: "https://github.com/Gabriel-Lacorte/prefetch-bleed",
        YEAR: "2026",
    },
    {
        NAME: "CVE-2025-7771",
        SUMMARY:
            "Arbitrary kernel function call through a vulnerable driver.",
        STACK: ["C++", "Windows kernel", "IOCTL"],
        HREF: "https://github.com/Gabriel-Lacorte/CVE-2025-7771",
        YEAR: "2025",
    },
    {
        NAME: "$Crypt",
        SUMMARY:
            "Protocol analysis framework for dissecting traffic.",
        STACK: ["Rust", "Lua", "Just"],
        HREF: "https://github.com/Gabriel-Lacorte/scrypt",
        YEAR: "2026",
    },
    {
        NAME: "CVE-2026-36670",
        SUMMARY:
            "Time-based blind SQL injection in the OpenSIPS Control Panel. First CVE.",
        STACK: ["SQL injection", "OpenSIPS"],
        HREF: "https://github.com/Gabriel-Lacorte/CVE-2026-36670",
        YEAR: "2026",
    },
];

export const USES: UsesGroup[] = [
    {
        GROUP: "Workstation",
        ROWS: [
            { k: "os", v: "Debian 13" },
            { k: "cpu", v: "Intel i5-9400F, 6 cores" },
            { k: "memory", v: "16GB" },
            { k: "gpu", v: "GeForce GTX 1650" },
        ],
    },
    {
        GROUP: "homelab",
        ROWS: [
            { k: "host", v: "Debian 12, salvaged parts" },
            { k: "runtime", v: "Docker" },
            { k: "ingress", v: "Cloudflare Tunnel" },
            { k: "writeup", v: "/blog/home-server-guide" },
        ],
    },
    {
        GROUP: "this site",
        ROWS: [
            { k: "framework", v: "Astro" },
            { k: "type", v: "Iosevka + Departure Mono" },
            { k: "licence", v: "SIL OFL 1.1" },
            { k: "hosting", v: "Vercel" },
        ],
    },
];

export const CHANGELOG: ChangelogEntry[] = [
    {
        DATE: "2026-08-04",
        TEXT: {
            en: "Rebuilt the site from scratch.",
            "pt-br": "Reconstruí o site do zero.",
        },
    },
    {
        DATE: "2024-12-24",
        TEXT: {
            en: "New post: static analysis of RansomHub's ESXi locker.",
            "pt-br":
                "Novo post: análise estática do locker ESXi do RansomHub.",
        },
    },
    {
        DATE: "2024-06-01",
        TEXT: {
            en: "New post: a home server out of salvaged parts.",
            "pt-br": "Novo post: um servidor caseiro feito de peças recuperadas.",
        },
    },
    {
        DATE: "2024-05-04",
        TEXT: {
            en: "New post: attacking Kerberos in Active Directory.",
            "pt-br": "Novo post: atacando Kerberos no Active Directory.",
        },
    },
];

export const NOW = {
    UPDATED: "2026-08-04",
    LINES: [
        "Rebuilding this site.",
    ],
};

/* The 88x31 wall. Each badge carries its own true size so the row never
   reflows, and HREF is optional because most of these are ornaments — but a
   membership badge that points nowhere is a webring worn as costume, so the
   WebCírculo entry wants its hub URL as soon as there is one to point at. */
export const BADGES: Badge[] = [
    { SRC: "/badges/lacorte.gif", W: 88, H: 31, ALT: "lacorte.city" },
    { SRC: "/badges/chill-pill.gif", W: 88, H: 31, ALT: "take a chill pill" },
    {
        SRC: "/badges/privacy-net.gif",
        STILL: "/badges/privacy-net-still.gif",
        W: 88,
        H: 31,
        ALT: "internet privacy now!",
    },
    {
        SRC: "/badges/webcirculo-br.png",
        W: 29,
        H: 20,
        ALT: "Esse site faz parte do WebCírculo BR",
        LANG: "pt-BR",
        // HREF: the ring's hub, once known.
    },
];

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
