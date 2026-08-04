/**
 * UI strings, one dictionary per locale.
 *
 * `en` is the source of truth: its keys define the `UIKey` type, so a
 * missing or misspelt Portuguese key is a build error rather than a
 * silently English word in the middle of a Portuguese page.
 */

export const LOCALES = ["en", "pt-br"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** What the language switcher shows for each locale. */
export const LOCALE_LABEL: Record<Locale, string> = {
    en: "EN",
    "pt-br": "PT",
};

/** Goes in <html lang="…">. */
export const HTML_LANG: Record<Locale, string> = {
    en: "en",
    "pt-br": "pt-BR",
};

const en = {
    "site.designation": "lacorte.city",
    "site.role": "systems engineer",
    "site.tagline": "python * backend * offensive security",
    "site.overline": "the systems engineering notebook of",
    "site.statement":
        "I am a systems engineer with a passion for cybersec and low-level programming. This is where I write down what I find when I take things apart.",

    "home.about": "about me",
    "home.changelog": "changelog",
    "home.latest": "latest posts",
    "home.projects": "projects",
    "home.stack": "what i use",
    "home.now": "right now",
    "home.intro1":
        "Hey, welcome. I'm Gabriel, a systems engineer with a passion for cybersec and low-level programming. This is where I write down what I find when I take things apart.",
    "win.status": "Blog status",
    "win.lab": "Homelab status",
    "win.close": "Close window",
    "win.windows": "Windows",

    "nav.home": "~/",
    "nav.blog": "blog",
    "nav.projects": "projects",
    "nav.uses": "uses",
    "nav.now": "now",

    "panel.operator": "operator",
    "panel.stack": "stack",
    "panel.transmissions": "transmissions",
    "panel.builds": "builds",
    "panel.signal": "signal",
    "panel.log": "log",
    "panel.contents": "contents",
    "panel.fault": "fault",
    "panel.recover": "recover",
    "panel.selfTest": "self-test",
    "panel.signalBand": "signal",

    "field.name": "name",
    "field.role": "role",
    "field.based": "based",
    "field.writingAbout": "writing about",
    "field.logged": "logged",
    "field.reachable": "reachable",
    "field.mail": "mail",
    "field.filed": "filed",
    "field.read": "read",
    "field.words": "words",
    "field.tags": "tags",
    "field.stack": "stack",
    "field.source": "source",
    "field.writeup": "writeup",

    "value.yes": "yes",
    "value.active": "active",
    "value.whatIUse": "what I work with",
    "value.systemsCompilers": "",

    "unit.posts": "posts",
    "unit.words": "words",
    "unit.min": "min",
    "unit.logged": "logged",
    "unit.listed": "listed",
    "unit.entries": "entries",
    "unit.groups": "groups",
    "unit.rows": "rows",
    "unit.routes": "routes",
    "unit.sections": "sections",

    "action.allBuilds": "all builds",
    "action.fullSignal": "full signal",
    "action.backToBlog": "back to ~/blog",
    "action.fullNow": "cat ~/now",
    "action.skip": "Skip to content",
    "action.copy": "copy",
    "action.copied": "copied",
    "action.copyFailed": "failed",

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
        "Systems engineer, cybersec, and low-level programming.",

    "err.title": "404. No such file or directory",
    "err.description": "That path does not resolve.",
    "err.noent": "No such file or directory",
    "err.body":
        "It may have moved, or it may never have existed.",

    "status.online": "online",
    "status.posts": "posts",
    "status.words": "words",
    "status.build": "build",

    "fallback.notice":
        "This post has not been translated yet, showing the English original.",
    "lang.switch": "Change language",
} as const;

export type UIKey = keyof typeof en;

const ptBR: Record<UIKey, string> = {
    "site.designation": "lacorte.city",
    "site.role": "engenheiro de sistemas",
    "site.tagline": "python * backend * segurança ofensiva",
    "site.overline": "o caderno de engenharia de sistemas de",
    "site.statement":
        "Sou engenheiro de sistemas com paixão por segurança ofensiva e programação de baixo nível. Aqui é onde anoto o que encontro quando desmonto essas coisas.",

    "home.about": "sobre mim",
    "home.changelog": "changelog",
    "home.latest": "últimos posts",
    "home.projects": "projetos",
    "home.stack": "o que eu uso",
    "home.now": "agora",
    "home.intro1":
        "Olá, seja bem-vindo. Sou o Gabriel, engenheiro de sistemas com paixão por segurança ofensiva e programação de baixo nível. Aqui é onde anoto o que encontro quando desmonto essas coisas.",
    "home.intro2":
        "Este site é onde escrevo sobre sistemas, compiladores e engenharia de baixo nível. Também é onde mostro os projetos que construí, e o que uso para construí-los.",
    "win.status": "Status do blog",
    "win.lab": "Status do homelab",
    "win.close": "Fechar janela",
    "win.windows": "Janelas",

    "nav.home": "~/",
    "nav.blog": "blog",
    "nav.projects": "projetos",
    "nav.uses": "setup",
    "nav.now": "agora",

    "panel.operator": "operador",
    "panel.stack": "stack",
    "panel.transmissions": "transmissões",
    "panel.builds": "construções",
    "panel.signal": "sinal",
    "panel.log": "registro",
    "panel.contents": "índice",
    "panel.fault": "falha",
    "panel.recover": "recuperar",
    "panel.selfTest": "autoteste",
    "panel.signalBand": "sinal",

    "field.name": "nome",
    "field.role": "função",
    "field.based": "base",
    "field.writingAbout": "escrevo sobre",
    "field.logged": "registrado",
    "field.reachable": "contactável",
    "field.mail": "e-mail",
    "field.filed": "data",
    "field.read": "leitura",
    "field.words": "palavras",
    "field.tags": "tags",
    "field.stack": "stack",
    "field.source": "fonte",
    "field.writeup": "artigo",

    "value.yes": "sim",
    "value.active": "ativo",
    "value.whatIUse": "com o que trabalho",
    "value.systemsCompilers": "",

    "unit.posts": "posts",
    "unit.words": "palavras",
    "unit.min": "min",
    "unit.logged": "registrados",
    "unit.listed": "listados",
    "unit.entries": "entradas",
    "unit.groups": "grupos",
    "unit.rows": "linhas",
    "unit.routes": "rotas",
    "unit.sections": "seções",

    "action.allBuilds": "todas as construções",
    "action.fullSignal": "sinal completo",
    "action.backToBlog": "voltar para ~/blog",
    "action.fullNow": "cat ~/now",
    "action.skip": "Ir para o conteúdo",
    "action.copy": "copiar",
    "action.copied": "copiado",
    "action.copyFailed": "falhou",

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
        "Engenheiro de sistemas, hipervisores, compiladores e sistemas operacionais.",

    "err.title": "404, arquivo ou diretório inexistente",
    "err.description": "Esse caminho não resolve.",
    "err.noent": "Arquivo ou diretório inexistente",
    "err.body": "Pode ter mudado, ou pode nunca ter existido.",

    "status.online": "online",
    "status.posts": "posts",
    "status.words": "palavras",
    "status.build": "build",

    "fallback.notice":
        "Este post ainda não foi traduzido, exibindo o original em inglês.",
    "lang.switch": "Mudar idioma",
};

export const UI: Record<Locale, Record<UIKey, string>> = {
    en,
    "pt-br": ptBR,
};
