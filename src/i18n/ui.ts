export const LOCALES = ["en", "pt-br"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = {
    en: "EN",
    "pt-br": "PT",
};

export const HTML_LANG: Record<Locale, string> = {
    en: "en",
    "pt-br": "pt-BR",
};

const en = {
    "site.role": "systems engineer",
    "site.tagline": "python * backend * offensive security",

    "home.intro1":
        "Hey, welcome. I'm Gabriel, a systems engineer. I build systems and software, mostly around compilers and Windows internals, and I love offensive security.",
    "home.intro2":
        "This is where I write down what I find when I take things apart: the writeups, the projects that came out of them, and the machines I run it all on.",
    "win.status": "Blog status",
    "win.lab": "Homelab status",
    "win.close": "Close window",
    "win.moveHint": "window, arrow keys move",
    "lab.parts": "2 salvaged desktops",
    "lab.note": "runs my services",

    "nav.home": "~/",
    "nav.blog": "blog",
    "nav.projects": "projects",
    "nav.uses": "uses",
    "nav.now": "now",

    "panel.contents": "contents",

    "field.source": "source",
    "field.writeup": "writeup",

    "unit.posts": "posts",
    "unit.words": "words",
    "unit.listed": "listed",

    "action.backToBlog": "back to ~/blog",
    "action.skip": "Skip to content",
    "action.copy": "copy",
    "action.copied": "copied",
    "action.copyFailed": "failed",
    "action.copyLabel": "Copy code to clipboard",

    "meta.blogTitle": "Blog",
    "meta.blogDescription":
        "Notes on systems, compilers, and low-level engineering.",
    "meta.projectsTitle": "Projects",
    "meta.projectsDescription": "Things I have built.",
    "meta.usesTitle": "Uses",
    "meta.usesDescription":
        "Hardware, editor, and the machines this site and my homelab run on.",
    "meta.usesLede":
        "What I type on, what I type into, and what it all runs on.",
    "uses.unset": "(unset)",
    "meta.nowTitle": "Now",
    "meta.nowDescription": "What I am working on and reading at the moment.",
    "meta.nowLede":
        "What has my attention at the moment. Updated when it changes, not on a schedule.",
    "meta.homeDescription":
        "Systems engineer. I build systems and software, and I love offensive security. Notes on what I find when I take things apart.",

    "err.title": "404. No such file or directory",
    "err.description": "That path does not resolve.",
    "err.noent": "No such file or directory",
    "err.body":
        "It may have moved, or it may never have existed.",

    "fallback.notice":
        "This post has not been translated yet, showing the English original.",
} as const;

export type UIKey = keyof typeof en;

const ptBR: Record<UIKey, string> = {
    "site.role": "engenheiro de sistemas",
    "site.tagline": "python * backend * segurança ofensiva",

    "home.intro1":
        "Olá, seja bem-vindo. Sou o Gabriel, engenheiro de sistemas. Construo sistemas e software, principalmente em compiladores e internals do Windows, e amo segurança ofensiva.",
    "home.intro2":
        "Aqui é onde anoto o que encontro quando desmonto essas coisas: os artigos, os projetos que saíram deles, e as máquinas onde tudo isso roda.",
    "win.status": "Status do blog",
    "win.lab": "Status do homelab",
    "win.close": "Fechar janela",
    "win.moveHint": "janela, setas movem",
    "lab.parts": "2 desktops recuperados",
    "lab.note": "roda meus serviços",

    "nav.home": "~/",
    "nav.blog": "blog",
    "nav.projects": "projetos",
    "nav.uses": "setup",
    "nav.now": "agora",

    "panel.contents": "índice",

    "field.source": "fonte",
    "field.writeup": "artigo",

    "unit.posts": "posts",
    "unit.words": "palavras",
    "unit.listed": "listados",

    "action.backToBlog": "voltar para ~/blog",
    "action.skip": "Ir para o conteúdo",
    "action.copy": "copiar",
    "action.copied": "copiado",
    "action.copyFailed": "falhou",
    "action.copyLabel": "Copiar código para a área de transferência",

    "meta.blogTitle": "Blog",
    "meta.blogDescription":
        "Anotações sobre sistemas, compiladores e engenharia de baixo nível.",
    "meta.projectsTitle": "Projetos",
    "meta.projectsDescription": "Coisas que eu construí.",
    "meta.usesTitle": "Setup",
    "meta.usesDescription":
        "Hardware, editor e as máquinas onde este site e meu homelab rodam.",
    "meta.usesLede":
        "No que eu digito, para onde eu digito, e onde tudo isso roda.",
    "uses.unset": "(não definido)",
    "meta.nowTitle": "Agora",
    "meta.nowDescription": "No que estou trabalhando e lendo neste momento.",
    "meta.nowLede":
        "O que tem minha atenção neste momento. Atualizado quando muda, não por cronograma.",
    "meta.homeDescription":
        "Engenheiro de sistemas. Construo sistemas e software, e amo segurança ofensiva. Anotações do que encontro quando desmonto as coisas.",

    "err.title": "404, arquivo ou diretório inexistente",
    "err.description": "Esse caminho não resolve.",
    "err.noent": "Arquivo ou diretório inexistente",
    "err.body": "Pode ter mudado, ou pode nunca ter existido.",

    "fallback.notice":
        "Este post ainda não foi traduzido, exibindo o original em inglês.",
};

export const UI: Record<Locale, Record<UIKey, string>> = {
    en,
    "pt-br": ptBR,
};
