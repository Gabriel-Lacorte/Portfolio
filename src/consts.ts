import type {
    ChangelogEntry,
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

export const STACK_GROUPS: StackGroup[] = [
    {
        GROUP: "backend",
        ITEMS: ["Python (Flask, FastAPI)", "Go (Gin, Fiber)", "Node.js (Express, NestJS)"],
    },
    {
        GROUP: "frontend",
        ITEMS: ["React", "Svelte", "Astro"],
    },
    {
        GROUP: "devops",
        ITEMS: ["Docker", "Nginx", "Git", "CI/CD"],
    },
    {
        GROUP: "security",
        ITEMS: [
            "Offensive",
            "Active Directory",
            "Reverse engineering",
        ],
    }
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
    { DATE: "2026-08-04", TEXT: "Rebuilt the site from scratch." },
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

export const NOW = {
    UPDATED: "2026-08-04",
    LINES: [
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
