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
        ITEMS: ["C", "C++", "Rust", "x86 assembly", "Go", "Python", "Lua", "SQL", "Bash"],
    },
    {
        GROUP: "systems",
        ITEMS: ["Linux", "Windows kernel", "syscalls", "ELF", "KVM / VMX", "paging", "ESXi"],
    },
    {
        GROUP: "debugging",
        ITEMS: ["WinDbg", "LiveKD", "CDB", "VMware", "PowerShell"],
    },
    {
        GROUP: "security",
        ITEMS: [
            "driver exploitation",
            "side channels",
            "CVE research",
            "reverse engineering",
            "malware analysis",
            "Active Directory",
            "Kerberos",
        ],
    },
    {
        GROUP: "backend",
        ITEMS: ["Flask", "FastAPI", "Gin", "Node.js", "PostgreSQL", "Docker", "nginx"],
    },
];

/* Newest and heaviest first: the home page shows the top of this list,
   /projects shows all of it. Summaries and stacks are taken from the
   repositories themselves, not from memory — check them against the
   READMEs when you push something that changes what a project is.

   TODO(gabriel): the two 2024 web projects that used to head this list
   (notio, license-manager) are gone. They were the Neocities-era entries
   and they read as a different engineer's portfolio next to the driver
   work. Say the word and they come back at the bottom. */
export const PROJECTS: Project[] = [
    {
        NAME: "prefetch-bleed",
        SUMMARY:
            "Breaks Windows KASLR through the prefetch side-channel — times PREFETCHNTA against kernel addresses to find where the image actually landed.",
        STACK: ["C++", "x86 assembly", "CMake"],
        HREF: "https://github.com/Gabriel-Lacorte/prefetch-bleed",
        YEAR: "2026",
    },
    {
        NAME: "CVE-2025-7771",
        SUMMARY:
            "Arbitrary kernel function call through the ThrottleStop driver — a signed driver that hands its IOCTL interface to anything that asks.",
        STACK: ["C++", "Windows kernel", "IOCTL"],
        HREF: "https://github.com/Gabriel-Lacorte/CVE-2025-7771",
        YEAR: "2025",
    },
    {
        NAME: "scrypt",
        SUMMARY:
            "Protocol analysis framework: a Rust core for dissecting traffic, scripted in Lua so a new protocol is a script rather than a rebuild.",
        STACK: ["Rust", "Lua", "Just"],
        HREF: "https://github.com/Gabriel-Lacorte/scrypt",
        YEAR: "2026",
    },
    {
        NAME: "winvm-mcp",
        SUMMARY:
            "Puts a VMware Windows VM behind an MCP server, so a model can drive WinDbg, LiveKD and CDB and read a kernel back for itself.",
        STACK: ["Python", "PowerShell", "WinDbg", "MCP"],
        HREF: "https://github.com/Gabriel-Lacorte/winvm-mcp",
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
    {
        NAME: "homelab",
        SUMMARY:
            "Debian server built from two salvaged machines — containerised services behind a Cloudflare tunnel with Zero Trust in front.",
        STACK: ["Debian", "Docker", "Cloudflare", "nginx"],
        HREF: "/blog/home-server-guide",
        YEAR: "2024",
    },
];

/* A row set to "—" renders as "(unset)", which is a fine marker while
   you are filling this in and a bad thing to publish. So rows I had no
   evidence for are absent rather than blank — terminal and multiplexer
   were two of them.

   TODO(gabriel): check these. They were read off the machine, not told
   to me: Debian 13 and the CPU/RAM/GPU from /proc and lspci, VS Code
   from ~/.config/Code, bash from your login shell and a 135-line
   .bashrc. There is also a ~/.config/fish, so the shell line is the one
   most likely to be wrong. */
export const USES: UsesGroup[] = [
    {
        GROUP: "workstation",
        ROWS: [
            { k: "os", v: "Debian 13 · trixie" },
            { k: "editor", v: "VS Code" },
            { k: "shell", v: "bash" },
            { k: "cpu", v: "Intel i5-9400F · 6 cores" },
            { k: "memory", v: "16GB" },
            { k: "gpu", v: "GeForce GTX 1650" },
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
            { k: "hosting", v: "Vercel · static" },
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

/* One real entry beats three, two of which said "add yours" on the live
   site. Add rows as you actually pick things up.

   TODO(gabriel): this is the one part I cannot invent for you. */
export const READING: ReadingItem[] = [
    { TITLE: "Intel SDM, vol. 3", NOTE: "VMX chapters, slowly", STATE: "now" },
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
