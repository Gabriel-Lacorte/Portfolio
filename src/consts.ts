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
  HANDLE: "lacort.ee",
  DESIGNATION: "lacort.ee",
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
  DESCRIPTION: "Notes on offsec, systems, and low-level engineering.",
};

export const PROJECTS_META: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Things I have built.",
};

export const STACK_GROUPS: StackGroup[] = [
  {
    GROUP: "systems",
    ITEMS: ["C++", "Rust"],
  },
  {
    GROUP: "backend",
    ITEMS: [
      "Python (Flask, FastAPI)",
      "Go (Gin, Fiber)",
      "Node.js (Express, NestJS)",
    ],
  },
  {
    GROUP: "security",
    ITEMS: ["Active Directory", "Windows kernel", "Reverse engineering"],
  },
  {
    GROUP: "frontend",
    ITEMS: ["React", "Svelte", "Astro"],
  },
  {
    GROUP: "devops",
    ITEMS: ["Docker", "Nginx", "Git"],
  },
];

export const PROJECTS: Project[] = [
  {
    NAME: "Starforge",
    SUMMARY: "A Multiplayer Pixel Art & Animation Studio.",
    STACK: ["TypeScript"],
    HREF: "https://github.com/Gabriel-Lacorte/starforge",
    YEAR: "2026",
  },
  {
    NAME: "$crypt",
    SUMMARY: "Protocol analysis framework for dissecting traffic.",
    STACK: ["Rust", "Lua", "Just"],
    HREF: "https://github.com/Gabriel-Lacorte/scrypt",
    YEAR: "2026",
  },
  {
    NAME: "Prefetch Bleed",
    SUMMARY:
      "Breaks Windows KASLR through the prefetch side-channel, times PREFETCHNTA against kernel addresses to find the kernel base.",
    STACK: ["C++", "x86 Assembly"],
    HREF: "https://github.com/Gabriel-Lacorte/prefetch-bleed",
    YEAR: "2026",
  },
  {
    NAME: "CVE-2025-7771",
    SUMMARY: "Arbitrary kernel function call through a vulnerable driver.",
    STACK: ["C++", "Windows kernel", "BYOVD"],
    HREF: "https://github.com/Gabriel-Lacorte/CVE-2025-7771",
    YEAR: "2025",
  },
  {
    NAME: "CVE-2026-36670",
    SUMMARY:
      "Time-based blind SQL injection in the OpenSIPS Control Panel. First CVE.",
    STACK: ["SQL injection"],
    HREF: "https://github.com/Gabriel-Lacorte/CVE-2026-36670",
    YEAR: "2026",
  },
];

export const USES: UsesGroup[] = [
  {
    GROUP: "workstation",
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
      { k: "host", v: "Debian 12" },
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
      { k: "hosting", v: "raspberry pi" },
    ],
  },
];

export const CHANGELOG: ChangelogEntry[] = [
  {
    DATE: "2026-09-25",
    TEXT: {
      en: "The site now lives at lacort.ee",
      "pt-br": "O site agora vive em lacort.ee",
    },
  },
  {
    DATE: "2026-09-05",
    TEXT: {
      en: "Built Starforge (starforge.lacort.ee)",
      "pt-br": "Construi Starforge (starforge.lacort.ee)",
    },
  },
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
      "pt-br": "Novo post: análise estática do locker ESXi do RansomHub.",
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
  UPDATED: "2026-09-25",
  LINES: [
    "Building Starforge, check the project!",
    "Moved this site to lacort.ee.",
  ],
};

export const BADGES: Badge[] = [
  { SRC: "/badges/lacorte.gif", W: 88, H: 31, ALT: "lacort.ee" },
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
