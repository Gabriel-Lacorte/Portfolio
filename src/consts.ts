import type { Metadata, Site, Socials, Skill } from "@types";

export const SITE: Site = {
    TITLE: "Gabriel L",
    DESCRIPTION:
        "Personal website where I write about software development and cybersecurity.",
    EMAIL: "gabriellacorte@posteo.com",
};

export const HOME: Metadata = {
    TITLE: "Home",
    DESCRIPTION: "A backend developer personal website :D",
};

export const BLOG: Metadata = {
    TITLE: "Blog",
    DESCRIPTION: "Things i write about computers.",
};

export const SKILLS: Skill[] = [
    "Backend Development (Python (Flask, FastAPI), Go (Gin), Node.js)",
    "Frontend Development (React, NextJS, Astro)",
    "DevOps (Docker, Linux, Git, CI/CD)",
    "Cyber Security (Offensive, Active Directory)",
];

export const SOCIALS: Socials = [
    {
        NAME: "GitHub",
        HREF: "https://github.com/Gabriel-Lacorte",
    },
    {
        NAME: "LinkedIn",
        HREF: "https://www.linkedin.com/in/gabriel-lacorte-dev/",
    },
];
