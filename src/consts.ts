import type {
    Capability,
    ChangelogEntry,
    Metadata,
    NavItem,
    Project,
    Site,
    Socials,
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

export const NAV: NavItem[] = [
    { LABEL: "~/", HREF: "/" },
    { LABEL: "blog", HREF: "/blog" },
    { LABEL: "projects", HREF: "/projects" },
    { LABEL: "uses", HREF: "/uses" },
    { LABEL: "now", HREF: "/now" },
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

/* The capability sheet. Replaces the old SKILLS list, which read
   "Frontend Development (React, NextJS, Astro)" and undersold everything
   underneath it. Statuses are deliberately honest — a sheet where every
   row says FLUENT carries no information at all. */
export const CAPABILITIES: Capability[] = [
    { NAME: "go · services · tooling", STATUS: "FLUENT" },
    { NAME: "python · automation", STATUS: "FLUENT" },
    { NAME: "c · systems programming", STATUS: "FLUENT" },
    { NAME: "linux · syscalls · elf", STATUS: "ACTIVE" },
    { NAME: "docker · networking · self-host", STATUS: "ACTIVE" },
    { NAME: "active directory · kerberos", STATUS: "FIELD" },
    { NAME: "reverse engineering · malware", STATUS: "FIELD" },
    { NAME: "kvm · vmx · ept · paging", STATUS: "STUDY" },
    { NAME: "compilers · ir · codegen", STATUS: "STUDY" },
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

/* Home-page figure. Column-aligned by generator; if you edit it, keep the
   sub-labels clear of the arrows. */
export const PIPELINE = `front end source ──►  lex   ──► parse ──►  AST
            .c       tokens      tree     typed

back end   IR ──►  opt   ──► regalloc ──►  emit  ──► ELF
          SSA     passes      vregs       object`;

export const PIPELINE_ALT =
    "Diagram of a compiler pipeline. The front end runs source (.c) through lex to tokens, parse to a tree, and on to a typed AST. The back end takes IR in SSA form through optimisation passes, then register allocation over virtual registers, then emits an object file and finally an ELF binary.";

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
