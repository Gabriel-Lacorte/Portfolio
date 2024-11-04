import type { Metadata, Site, Socials, Skill } from "@types";

export const SITE: Site = {
    TITLE: "Gabriel L",
    DESCRIPTION:
        "My personal website where I write about topics about software development and cybersecurity.",
    EMAIL: "gabriellacorte@posteo.com",
};

export const HOME: Metadata = {
    TITLE: "Home",
    DESCRIPTION: "A backend developer and cybersecurity enthusiast.",
};

export const BLOG: Metadata = {
    TITLE: "Blog",
    DESCRIPTION: "A collection of my thoughts and experiences.",
};

export const SKILLS: Skill[] = [
    "Backend Development (Node.js (Express, NextJS), Python (Flask, FastAPI), Go (Gin))",
    "Frontend Development (React, Astro, Tailwind CSS)",
    "DevOps (Docker, Linux, Git, CI/CD)",
    "Database Management (SQL, Prisma, SQLAlchemy)",
    "Cyber Security (Offensive, Active Directory)",
    "Low-level Programming (C, Assembly (x86_64))",
];

export const SOCIALS: Socials = [
    {
        NAME: "GitHub",
        HREF: "https://github.com/Gabriel-Lacorte",
    },
    {
        NAME: "LinkedIn",
        HREF: "https://www.linkedin.com/in/gabriel-lacorte/",
    },
];
